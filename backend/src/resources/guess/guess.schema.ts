import { z } from 'zod';

// guess schema
export const guess = z.object({
    sketchId: z.uuid(),
    text: z.string().min(1)
});