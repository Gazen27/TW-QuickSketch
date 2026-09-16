import { z } from 'zod';

// schema used for both login and signup request
export const credentials = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8)
});