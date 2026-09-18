import { z } from 'zod';

export const sketch = z.object({
    wordId: z.uuid(),
    drawing: z.string().min(1)
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