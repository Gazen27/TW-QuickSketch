import { z } from 'zod';

// credentials validation login and signup
export const credentials = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8)
});