import { z } from "zod";

export const upsertSalesSchema = z.object({
  productId: z.string().uuid({ message: "O produto é obrigatório" }),
  quantity: z.number().int().positive(),
});

export type UpsertSaleSchema = z.infer<typeof upsertSalesSchema>;
