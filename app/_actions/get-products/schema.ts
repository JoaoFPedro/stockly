import { z } from "zod";

export const upsertSalesSchema = z.object({
  productId: z.string().uuid().optional(),

  quantity: z.number().min(0.01, {
    message: "A quantidade é obrigatória.",
  }),
});

export type UpsertSaleSchema = z.infer<typeof upsertSalesSchema>;
