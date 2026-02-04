import { z } from "zod";

export const roleSchemas = z.object({
  name: z.string().toLowerCase(),
  description: z.string(),
});
