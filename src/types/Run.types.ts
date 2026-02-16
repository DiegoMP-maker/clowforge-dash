export const RUN_STATUSES = ['pending', 'running', 'completed', 'failed', 'cancelled'] as const;
export type RunStatus = (typeof RUN_STATUSES)[number];

export type Run = {
  id: string;
  project_name: string;
  trigger: string;
  status: RunStatus;
  created_at: string | null;
  completed_at: string | null;
};
