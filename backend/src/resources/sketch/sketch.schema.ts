import { z } from 'zod';

// sketch validation schema
export const sketch = z.object({
  // TODO
});

// optional category in query validation
export const category = z.object({
    category: z.enum([
        'animals',
        'objects',
        'food',
        'videogames'
    ]).optional()
});