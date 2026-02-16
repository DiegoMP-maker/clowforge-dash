# Copy Document: clowforge-dashboard

## Voice & Tone

- **Voice:** Technical, direct, no-nonsense. This is an internal developer tool. Speak to developers who understand the pipeline. Use technical terminology without apology. Brief and actionable.

- **Tone shifts:**
  - **Success states:** Straightforward confirmation. "Deploy completed."
  - **Error states:** Diagnostic. Provide specific error info, not sympathy. "Build failed. Task 3 (Developer) timed out after 600s."
  - **Empty states:** Neutral guidance. "No runs yet. Deploy a project to create a run."
  - **Loading states:** Minimal. "Loading..." or specific progress ("Architect generating blueprint...").

---

## Global

### Navigation
| Key | Text |
|-----|------|
| `nav.projects` | Projects |
| `nav.runs` | Runs |
| `nav.costs` | Costs |
| `nav.health` | Health |
| `nav.settings` | Settings |

### Common Actions
| Key | Text |
|-----|------|
| `action.save` | Save |
| `action.cancel` | Cancel |
| `action.delete` | Delete |
| `action.deploy` | Deploy |
| `action.refresh` | Refresh |
| `action.filter` | Filter |
| `action.export` | Export |
| `action.terminate` | Terminate |
| `action.retry` | Retry |
| `action.viewLogs` | View Logs |
| `action.loading` | Loading... |
| `action.close` | Close |

---

## Auth

### Login Page
| Key | Text |
|-----|------|
| `auth.login.title` | ClowForge Dashboard |
| `auth.login.subtitle` | Sign in to continue |
| `auth.login.email.label` | Email |
| `auth.login.email.placeholder` | you@example.com |
| `auth.login.password.label` | Password |
| `auth.login.password.placeholder` | Enter your password |
| `auth.login.submit` | Sign in |
| `auth.login.error.invalid` | Invalid email or password |
| `auth.login.error.network` | Connection failed. Check network and retry. |

---

## Projects

### Projects List
| Key | Text |
|-----|------|
| `projects.title` | Projects |
| `projects.new` | New Project |
| `projects.stats.active` | Active |
| `projects.stats.completed` | Completed |
| `projects.stats.failed` | Failed |
| `projects.stats.total` | Total |
| `projects.empty.title` | No projects yet |
| `projects.empty.message` | Create your first project to get started with ClowForge. |
| `projects.empty.cta` | Create Project |

### Project Card
| Key | Text |
|-----|------|
| `projectCard.preview` | Preview |
| `projectCard.production` | Production |
| `projectCard.repository` | Repository |
| `projectCard.lastRun` | Last run: {time} |
| `projectCard.noRuns` | No runs yet |

### Project Detail
| Key | Text |
|-----|------|
| `project.tabs.runs` | Runs |
| `project.tabs.files` | Files |
| `project.tabs.settings` | Settings |
| `project.info.status` | Status |
| `project.info.created` | Created |
| `project.info.updated` | Last updated |
| `project.info.preview` | Preview URL |
| `project.info.production` | Production URL |
| `project.info.repository` | Repository |
| `project.info.branch` | Branch |
| `project.runs.empty.title` | No runs yet |
| `project.runs.empty.message` | This project hasn't been built yet. Deploy to create a run. |
| `project.runs.empty.cta` | Deploy |

---

## Runs

### Runs List
| Key | Text |
|-----|------|
| `runs.title` | Runs |
| `runs.filter.status` | Status |
| `runs.filter.project` | Project |
| `runs.filter.dateRange` | Date range |
| `runs.filter.clear` | Clear filters |
| `runs.table.id` | ID |
| `runs.table.project` | Project |
| `runs.table.status` | Status |
| `runs.table.started` | Started |
| `runs.table.duration` | Duration |
| `runs.table.cost` | Cost |
| `runs.empty.title` | No runs found |
| `runs.empty.message` | Try adjusting your filters or create a new project. |
| `runs.empty.cta` | Clear Filters |

### Run Detail
| Key | Text |
|-----|------|
| `run.info.id` | Run ID |
| `run.info.status` | Status |
| `run.info.project` | Project |
| `run.info.started` | Started |
| `run.info.completed` | Completed |
| `run.info.duration` | Duration |
| `run.info.cost` | Cost |
| `run.tasks.title` | Tasks |
| `run.tasks.agent` | Agent |
| `run.tasks.phase` | Phase |
| `run.tasks.status` | Status |
| `run.tasks.duration` | Duration |
| `run.tasks.tokens` | Tokens |
| `run.tasks.cost` | Cost |
| `run.artifacts.title` | Artifacts |
| `run.artifacts.download` | Download |
| `run.empty.tasks.title` | Run initializing... |
| `run.empty.tasks.message` | Tasks will appear here as the run progresses. |

### Run Statuses
| Key | Text |
|-----|------|
| `status.pending` | Pending |
| `status.running` | Running |
| `status.completed` | Completed |
| `status.failed` | Failed |
| `status.cancelled` | Cancelled |

### Task Agents
| Key | Text |
|-----|------|
| `agent.architect` | Architect |
| `agent.leadFrontend` | Lead Frontend |
| `agent.designer` | Designer |
| `agent.developer` | Developer |
| `agent.reviewer` | Reviewer |

---

## Costs

| Key | Text |
|-----|------|
| `costs.title` | Costs |
| `costs.export` | Export CSV |
| `costs.stats.total` | Total Cost |
| `costs.stats.thisMonth` | This Month |
| `costs.stats.avgRun` | Avg per Run |
| `costs.chart.title` | Cost Trend (Last 30 Days) |
| `costs.breakdown.title` | Cost Breakdown by Agent |
| `costs.table.agent` | Agent |
| `costs.table.runs` | Runs |
| `costs.table.totalCost` | Total Cost |
| `costs.table.avgCost` | Avg Cost |
| `costs.table.percentage` | % of Total |

---

## Health

| Key | Text |
|-----|------|
| `health.title` | System Health |
| `health.status.operational` | All Systems Operational |
| `health.status.degraded` | Degraded Performance |
| `health.status.outage` | Service Outage |
| `health.service.supabase` | Supabase |
| `health.service.vercel` | Vercel |
| `health.service.openai` | OpenAI |
| `health.service.status.operational` | Operational |
| `health.service.status.degraded` | Degraded |
| `health.service.status.down` | Down |
| `health.errors.title` | Recent Errors |
| `health.errors.empty.title` | No recent errors |
| `health.errors.empty.message` | All systems are running smoothly. |

---

## Settings

| Key | Text |
|-----|------|
| `settings.title` | Settings |
| `settings.tabs.account` | Account |
| `settings.tabs.notifications` | Notifications |
| `settings.tabs.security` | Security |
| `settings.account.email.label` | Email |
| `settings.account.name.label` | Full name |
| `settings.account.role.label` | Role |
| `settings.account.save` | Save changes |
| `settings.notifications.email.label` | Email notifications |
| `settings.notifications.runCompleted` | Run completed |
| `settings.notifications.runFailed` | Run failed |
| `settings.notifications.save` | Save preferences |
| `settings.security.password.label` | Password |
| `settings.security.changePassword` | Change password |
| `settings.security.currentPassword.label` | Current password |
| `settings.security.newPassword.label` | New password |
| `settings.security.confirmPassword.label` | Confirm new password |

---

## Errors

### Validation Errors
| Key | Text |
|-----|------|
| `error.required` | Required |
| `error.email.invalid` | Invalid email address |
| `error.password.min` | Password must be at least 8 characters |
| `error.password.mismatch` | Passwords do not match |

### API Errors
| Key | Text |
|-----|------|
| `error.network` | Network error. Check connection and retry. |
| `error.server` | Server error. Try again in a moment. |
| `error.unauthorized` | Session expired. Sign in again. |
| `error.forbidden` | Permission denied. |
| `error.notFound` | Resource not found. |
| `error.timeout` | Request timed out. Retry. |
| `error.unknown` | An error occurred. Contact support if this persists. |

### Toast Messages
| Key | Text |
|-----|------|
| `toast.deploy.success` | Deploy started |
| `toast.deploy.error` | Deploy failed. Check logs. |
| `toast.save.success` | Changes saved |
| `toast.save.error` | Save failed. Retry. |
| `toast.delete.success` | Deleted |
| `toast.delete.error` | Delete failed |
| `toast.copy.success` | Copied to clipboard |
| `toast.terminate.success` | Run terminated |
| `toast.terminate.error` | Terminate failed |

---

## Empty States

### Generic
| Key | Text |
|-----|------|
| `empty.title` | No data |
| `empty.message` | Nothing to display yet. |

### Projects
| Key | Text |
|-----|------|
| `empty.projects.title` | No projects yet |
| `empty.projects.message` | Create your first project to get started with ClowForge. |
| `empty.projects.cta` | Create Project |

### Runs
| Key | Text |
|-----|------|
| `empty.runs.title` | No runs found |
| `empty.runs.message` | Try adjusting your filters or create a new project. |
| `empty.runs.cta` | Clear Filters |

### Tasks
| Key | Text |
|-----|------|
| `empty.tasks.title` | Run initializing... |
| `empty.tasks.message` | Tasks will appear here as the run progresses. |

### Errors (Health)
| Key | Text |
|-----|------|
| `empty.errors.title` | No recent errors |
| `empty.errors.message` | All systems are running smoothly. |

---

## Meta

| Page | Title | Description |
|------|-------|-------------|
| Login | Sign In - ClowForge Dashboard | Sign in to ClowForge Dashboard |
| Projects | Projects - ClowForge Dashboard | View and manage ClowForge projects |
| Project Detail | {Project Name} - ClowForge Dashboard | Project details and runs |
| Runs | Runs - ClowForge Dashboard | View all pipeline runs |
| Run Detail | Run {ID} - ClowForge Dashboard | Run details and task progress |
| Costs | Costs - ClowForge Dashboard | Cost tracking and analytics |
| Health | System Health - ClowForge Dashboard | System status and service health |
| Settings | Settings - ClowForge Dashboard | Account and dashboard settings |

---

## Time Formatting

| Key | Format |
|-----|--------|
| `time.relative.justNow` | Just now |
| `time.relative.minutesAgo` | {n}m ago |
| `time.relative.hoursAgo` | {n}h ago |
| `time.relative.daysAgo` | {n}d ago |
| `time.relative.weeksAgo` | {n}w ago |
| `time.duration.seconds` | {n}s |
| `time.duration.minutes` | {n}m |
| `time.duration.hours` | {n}h |
| `time.duration.days` | {n}d |

---

## Units

| Key | Text |
|-----|------|
| `units.cost.usd` | ${amount} |
| `units.tokens.input` | {n} in |
| `units.tokens.output` | {n} out |
| `units.tokens.total` | {n} tokens |
