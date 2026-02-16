import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || '';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_WEBHOOK_CHAT_ID || '-1003830956160'; // Proyecto Oracle default
const CLOWFORGE_CHAT_ID = '-1003625642574'; // ClowForge group
const CLOWFORGE_PIPELINE_TOPIC = 3; // Pipeline topic in ClowForge group

// GitHub App credentials for responding to ChatOps commands
const GITHUB_APP_ID = process.env.GITHUB_APP_ID || '';
const GITHUB_APP_PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY || '';
const GITHUB_APP_INSTALLATION_ID = process.env.GITHUB_APP_INSTALLATION_ID || '110548432';

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

// ── GitHub API Helper (using App token) ──────────────────────

async function getGitHubAppToken(): Promise<string> {
  if (!GITHUB_APP_ID || !GITHUB_APP_PRIVATE_KEY) return '';

  try {
    // Build JWT manually using Web Crypto API (Edge Runtime compatible)
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = { iat: now - 60, exp: now + 600, iss: parseInt(GITHUB_APP_ID) };

    const b64url = (data: string) =>
      btoa(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const headerB64 = b64url(JSON.stringify(header));
    const payloadB64 = b64url(JSON.stringify(payload));
    const message = `${headerB64}.${payloadB64}`;

    // Import PEM key
    const pemBody = GITHUB_APP_PRIVATE_KEY
      .replace(/-----BEGIN RSA PRIVATE KEY-----/, '')
      .replace(/-----END RSA PRIVATE KEY-----/, '')
      .replace(/\n/g, '');
    const keyBuffer = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));

    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8', keyBuffer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false, ['sign']
    );

    const sigBuffer = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5', cryptoKey,
      new TextEncoder().encode(message)
    );
    const sigB64 = b64url(String.fromCharCode(...new Uint8Array(sigBuffer)));
    const jwt = `${message}.${sigB64}`;

    // Exchange JWT for installation token
    const resp = await fetch(
      `https://api.github.com/app/installations/${GITHUB_APP_INSTALLATION_ID}/access_tokens`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: '{}',
      }
    );
    if (!resp.ok) return '';
    const data = await resp.json();
    return data.token || '';
  } catch {
    return '';
  }
}

async function githubComment(repo: string, issueNumber: number, body: string): Promise<void> {
  const token = await getGitHubAppToken();
  if (!token) return;

  await fetch(`https://api.github.com/repos/DiegoMP-maker/${repo}/issues/${issueNumber}/comments`, {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'ClowPaco-Bot/1.0',
    },
    body: JSON.stringify({ body }),
  }).catch(() => {});
}

// ── ChatOps: /forge Commands (P10-6) ─────────────────────────

const FORGE_COMMANDS: Record<string, string> = {
  review: 'Code review via ClowForge reviewer agent',
  deploy: 'Deploy to production (merge PR + Vercel auto-deploy)',
  status: 'Show project pipeline status',
  validate: 'Run sandbox validation (build + lint + typecheck)',
};

async function handleForgeCommand(
  repo: string,
  command: string,
  args: string,
  user: string,
  prNumber: number,
): Promise<void> {
  // Validate command
  if (command === 'help' || !FORGE_COMMANDS[command]) {
    const helpText = Object.entries(FORGE_COMMANDS)
      .map(([cmd, desc]) => `- \`/forge ${cmd}\` — ${desc}`)
      .join('\n');
    await githubComment(repo, prNumber,
      `## ClowForge ChatOps\n\nAvailable commands:\n${helpText}\n\n` +
      `Usage: \`/forge <command>\` in any PR or issue comment.`
    );
    return;
  }

  // Acknowledge the command
  await githubComment(repo, prNumber,
    `⏳ **ClowForge** processing \`/forge ${command}${args ? ' ' + args : ''}\` (requested by @${user})...`
  );

  // Forward to Telegram for OpenClaw to pick up
  const forgeMessage =
    `🤖 <b>ChatOps:</b> /forge ${command}${args ? ' ' + args : ''}\n` +
    `Repo: <code>${repo}</code> PR #${prNumber}\n` +
    `By: ${user}\n\n` +
    `<code>clowforge ${command} ${repo}${args ? ' ' + args : ''}</code>`;

  await sendTelegram(forgeMessage, CLOWFORGE_CHAT_ID, CLOWFORGE_PIPELINE_TOPIC);
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
    const msg = ((c.message as string) || '').split('\n')[0]?.slice(0, 60) ?? '';
    const sha = ((c.id as string) || '').slice(0, 7);
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

function handleIssueComment(payload: GitHubPayload): { message: string | null; forgeCommand?: { repo: string; command: string; args: string; user: string; prNumber: number } } {
  const action = payload.action as string;
  if (action !== 'created') return { message: null };

  const comment = payload.comment as Record<string, unknown>;
  const issue = payload.issue as Record<string, unknown>;
  const repo = (payload.repository as Record<string, unknown>)?.name || 'unknown';

  const user = ((comment?.user as Record<string, unknown>)?.login as string) || 'unknown';
  const commentBody = ((comment?.body as string) || '');
  const issueTitle = (issue?.title as string || '').slice(0, 50);
  const number = (issue?.number as number) || 0;
  const url = comment?.html_url as string;
  const isPR = !!(issue?.pull_request);
  const type = isPR ? 'PR' : 'Issue';
  const repoStr = String(repo);

  // P10-6: Detect /forge commands
  const forgeMatch = commentBody.match(/^\/forge\s+(\w+)(.*)$/m);
  if (forgeMatch) {
    return {
      message: null, // Don't send regular notification for forge commands
      forgeCommand: {
        repo: repoStr,
        command: forgeMatch[1] ?? '',
        args: (forgeMatch[2] ?? '').trim(),
        user,
        prNumber: number,
      },
    };
  }

  const bodyPreview = commentBody.slice(0, 200);
  const message = `💬 <b>Comment</b> on ${type} <code>${repo}</code> #${number}\n<b>${issueTitle}</b>\nby ${user}: ${bodyPreview}${bodyPreview.length >= 200 ? '...' : ''}\n<a href="${url}">View</a>`;

  return { message };
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
  const forgeProjects = ['clowforge-dash', 'conversabiz-admin', 'voyager-ai', 'spanish-factoria', 'ele-studio', 'clowpaco-dashboard', 'espanol-prof'];
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
    case 'issue_comment': {
      // P10-6: Check for /forge commands in comments
      const result = handleIssueComment(payload);
      if (result.forgeCommand) {
        const { repo, command, args, user, prNumber } = result.forgeCommand;
        await handleForgeCommand(repo, command, args, user, prNumber);
        return NextResponse.json({ ok: true, event, handled: true, chatops: command });
      }
      message = result.message;
      break;
    }
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
    version: '2.0',
    events: ['push', 'pull_request', 'issue_comment', 'workflow_run', 'deployment_status'],
    chatops: ['/forge review', '/forge deploy', '/forge status', '/forge validate', '/forge help'],
  });
}
