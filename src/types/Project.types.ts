export type ProjectPhase =
  | 'plan'
  | 'assets'
  | 'build'
  | 'review'
  | 'deploy'
  | 'done'
  | 'failed'
  | 'built'
  | 'deployed-prod'
  | 'deployed-preview';

export type Project = {
  name: string; // PK — no separate id
  description: string | null;
  stack: string | null;
  repo_url: string | null;
  preview_url: string | null;
  prod_url: string | null;
  current_phase: ProjectPhase | string | null;
  created_at: string | null;
};
