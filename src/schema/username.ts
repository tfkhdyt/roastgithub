import { z } from "zod";

export const usernameSchema = z.object({
  username: z.string().min(1).max(30),
});
