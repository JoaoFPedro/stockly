import { z } from "zod";

export const createSalesSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type CreateSalesSchema = z.infer<typeof createSalesSchema>;
