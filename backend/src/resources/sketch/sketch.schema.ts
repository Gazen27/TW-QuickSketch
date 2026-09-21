import { z } from 'zod';

export const sketch = z.object({
    wordId: z.uuid(),
    drawing: z.string().min(1)
});