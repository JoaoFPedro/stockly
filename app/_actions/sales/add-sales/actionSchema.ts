import { z } from "zod";

export const CreateSalesSchema = z.object({
  id: z.string().uuid().optional(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type CreateSalesSchema = z.infer<typeof CreateSalesSchema>;
