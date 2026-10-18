import { z } from 'zod';

// Sketch creation schema
export const sketch = z.object({
  wordId: z.uuid(),
  drawing: z.string().min(1)
});

// Sketch paging retrival schema
export const exploreQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.enum(['createdAt', 'guessCount']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc')
});
