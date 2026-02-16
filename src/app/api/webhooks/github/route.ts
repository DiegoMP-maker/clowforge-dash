import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || '';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_WEBHOOK_CHAT_ID || '-1003830956160'; // Proyecto Oracle default
const CLOWFORGE_CHAT_ID = '-1003625642574'; // ClowForge group

// ── HMAC-SHA256 Signature Validation ─────────────────────────

async function verifySignature(body: string, signature: string | null): Promise<boolean> {
  if (!signature || !WEBHOOK_SECRET) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const hexHash = 'sha256=' + Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return hexHash === signature;
}

// ── Telegram Notification ────────────────────────────────────

async function sendTelegram(message: string, chatId: string, topicId?: number): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN) return;

  const data: Record<string, unknown> = {
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
  if (topicId) data.message_thread_id = topicId;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(() => {});
}

// ── Event Handlers ───────────────────────────────────────────

type GitHubPayload = Record<string, unknown>;

function handlePush(payload: GitHubPayload): string | null {
  const repo = (payload.repository as Record<string, unknown>)?.name || 'unknown';
  const ref = (payload.ref as string) || '';
  const branch = ref.replace('refs/heads/', '');
  const commits = (payload.commits as Array<Record<string, unknown>>) || [];
  const pusher = (payload.pusher as Record<string, unknown>)?.name || 'unknown';

  if (commits.length === 0) return null;

  const commitList = commits.slice(0, 3).map(c => {
    const msg = (c.message as string || '').split('\n')[0].slice(0, 60);
    const sha = (c.id as string || '').slice(0, 7);
    return `  <code>${sha}</code> ${msg}`;
  }).join('\n');

  const extra = commits.length > 3 ? `\n  ...and ${commits.length - 3} more` : '';

  return `🔀 <b>Push</b> → <code>${repo}</code>/<code>${branch}</code>\nby ${pusher} (${commits.length} commit${commits.length > 1 ? 's' : ''})\n${commitList}${extra}`;
}

function handlePullRequest(payload: GitHubPayload): string | null {
  const action = payload.action as string;
  const pr = payload.pull_request as Record<string, unknown>;
  const repo = (payload.repository as Record<string, unknown>)?.name || 'unknown';

  if (!['opened', 'closed', 'reopened'].includes(action)) return null;

  const title = (pr?.title as string || '').slice(0, 60);
  const number = pr?.number;
  const user = (pr?.user as Record<string, unknown>)?.login || 'unknown';
  const merged = pr?.merged;
  const url = pr?.html_url as string;

  const emoji = action === 'closed' && merged ? '🟣' : action === 'opened' ? '🟢' : '🔄';
  const status = action === 'closed' && merged ? 'merged' : action;

  return `${emoji} <b>PR ${status}</b> → <code>${repo}</code> #${number}\n<b>${title}</b>\nby ${user}\n<a href="${url}">View PR</a>`;
}

function handleIssueComment(payload: GitHubPayload): string | null {
  const action = payload.action as string;
  if (action !== 'created') return null;

  const comment = payload.comment as Record<string, unknown>;
  const issue = payload.issue as Record<string, unknown>;
  const repo = (payload.repository as Record<string, unknown>)?.name || 'unknown';

  const user = (comment?.user as Record<string, unknown>)?.login || 'unknown';
  const body = ((comment?.body as string) || '').slice(0, 200);
  const issueTitle = (issue?.title as string || '').slice(0, 50);
  const number = issue?.number;
  const url = comment?.html_url as string;
  const isPR = !!(issue?.pull_request);

  const type = isPR ? 'PR' : 'Issue';

  return `💬 <b>Comment</b> on ${type} <code>${repo}</code> #${number}\n<b>${issueTitle}</b>\nby ${user}: ${body}${body.length >= 200 ? '...' : ''}\n<a href="${url}">View</a>`;
}

function handleWorkflowRun(payload: GitHubPayload): string | null {
  const action = payload.action as string;
  if (action !== 'completed') return null;

  const run = payload.workflow_run as Record<string, unknown>;
  const repo = (payload.repository as Record<string, unknown>)?.name || 'unknown';
  const conclusion = run?.conclusion as string;
  const name = run?.name as string || 'workflow';
  const url = run?.html_url as string;

  if (conclusion === 'success') return null; // Only notify on failures

  return `❌ <b>Workflow Failed</b> → <code>${repo}</code>\n<b>${name}</b>: ${conclusion}\n<a href="${url}">View logs</a>`;
}

function handleDeploymentStatus(payload: GitHubPayload): string | null {
  const ds = payload.deployment_status as Record<string, unknown>;
  const state = ds?.state as string;
  const repo = (payload.repository as Record<string, unknown>)?.name || 'unknown';
  const env = ds?.environment as string || 'unknown';
  const url = ds?.target_url as string;

  if (state !== 'failure' && state !== 'error') return null;

  return `🚨 <b>Deploy ${state}</b> → <code>${repo}</code> (${env})\n<a href="${url}">View</a>`;
}

// ── Route Chat ID Based on Repo ──────────────────────────────

function getChatId(repoName: string): string {
  const forgeProjects = ['clowforge-dash', 'conversabiz-admin', 'voyager-ai', 'spanish-factoria'];
  if (forgeProjects.includes(repoName)) return CLOWFORGE_CHAT_ID;
  return TELEGRAM_CHAT_ID;
}

// ── Main Handler ─────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('x-hub-signature-256');
  const event = req.headers.get('x-github-event') || 'unknown';

  // Validate signature
  if (WEBHOOK_SECRET) {
    const valid = await verifySignature(body, signature);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  const payload: GitHubPayload = JSON.parse(body);
  const repoName = ((payload.repository as Record<string, unknown>)?.name as string) || 'unknown';

  let message: string | null = null;

  switch (event) {
    case 'push':
      message = handlePush(payload);
      break;
    case 'pull_request':
      message = handlePullRequest(payload);
      break;
    case 'issue_comment':
      message = handleIssueComment(payload);
      break;
    case 'workflow_run':
      message = handleWorkflowRun(payload);
      break;
    case 'deployment_status':
      message = handleDeploymentStatus(payload);
      break;
    case 'ping':
      return NextResponse.json({ ok: true, event: 'ping', message: 'Webhook configured!' });
    default:
      // Silently ignore unhandled events
      return NextResponse.json({ ok: true, event, handled: false });
  }

  if (message) {
    const chatId = getChatId(repoName);
    await sendTelegram(message, chatId);
  }

  return NextResponse.json({ ok: true, event, handled: !!message });
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'github-webhook-receiver',
    events: ['push', 'pull_request', 'issue_comment', 'workflow_run', 'deployment_status'],
  });
}
