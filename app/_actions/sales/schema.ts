import { z } from "zod";

export const upsertSalesSchema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigatório.",
  }),
  quantity: z.coerce.number().int().positive(),
});

export type UpsertSalesSchema = z.infer<typeof upsertSalesSchema>;
