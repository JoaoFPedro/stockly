import { Product } from "../generated/prisma";

export function serializeDecimal(obj: Product[]) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null && "toNumber" in value) {
        return value.toNumber(); // or value.toString()
      }
      return value;
    }),
  );
}
