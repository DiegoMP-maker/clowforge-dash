export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export type Task = {
  id: string;
  run_id: string;
  kind: string;
  status: TaskStatus;
  agent_id: string | null;
  artifacts: Record<string, unknown> | null;
  error_log: string | null;
  attempt: number | null;
  created_at: string | null;
  updated_at: string | null;
};
