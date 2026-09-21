import { z } from 'zod';

// sketch schema
export const sketch = z.object({
    wordId: z.uuid(),
    drawing: z.string().min(1)
});