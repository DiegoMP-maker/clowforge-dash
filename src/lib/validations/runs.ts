import { z } from 'zod';

export const runQuerySchema = z.object({
  status: z.string().optional(),
  projectId: z.string().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type RunQueryInput = z.infer<typeof runQuerySchema>;
