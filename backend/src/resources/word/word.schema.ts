import { z } from 'zod';

// category validation
export const category = z.object({
    category: z.enum([
      'animals',
      'objects',
      'food',
      'videogames'
    ])
});