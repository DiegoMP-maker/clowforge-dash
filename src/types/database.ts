export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      forge_projects: {
        Row: {
          name: string; // PK (text, not UUID)
          description: string | null;
          stack: string | null;
          repo_url: string | null;
          preview_url: string | null;
          prod_url: string | null;
          current_phase: string | null;
          created_at: string | null;
        };
        Insert: {
          name: string;
          description?: string | null;
          stack?: string | null;
          repo_url?: string | null;
          preview_url?: string | null;
          prod_url?: string | null;
          current_phase?: string | null;
          created_at?: string | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          stack?: string | null;
          repo_url?: string | null;
          preview_url?: string | null;
          prod_url?: string | null;
          current_phase?: string | null;
        };
        Relationships: [];
      };
      forge_runs: {
        Row: {
          id: string;
          project_name: string;
          trigger: string;
          status: string;
          created_at: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          project_name: string;
          trigger?: string;
          status: string;
          created_at?: string | null;
          completed_at?: string | null;
        };
        Update: {
          status?: string;
          completed_at?: string | null;
        };
        Relationships: [];
      };
      forge_tasks: {
        Row: {
          id: string;
          run_id: string;
          kind: string;
          status: string;
          agent_id: string | null;
          artifacts: Json | null;
          error_log: string | null;
          attempt: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          run_id: string;
          kind: string;
          status: string;
          agent_id?: string | null;
          artifacts?: Json | null;
          error_log?: string | null;
          attempt?: number | null;
        };
        Update: {
          status?: string;
          agent_id?: string | null;
          artifacts?: Json | null;
          error_log?: string | null;
          attempt?: number | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
