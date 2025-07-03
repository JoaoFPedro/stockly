import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BestSellingProduct } from "../_data-access/get-dashboard-values";

interface BestSellingProductProps {
  product: BestSellingProduct[];
}
const BestSellingProducts = ({ product }: BestSellingProductProps) => {
  // Agrupa quantidades por id
  const quantityById: Record<string, number> = {};
  product.forEach((item) => {
    const id = Array.isArray(item.id) ? item.id[0] : item.id;
    quantityById[id] = (quantityById[id] || 0) + item.quantity;
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          {product.map((product, idx) => {
            const id = Array.isArray(product.id) ? product.id[0] : product.id;
            return (
              <div key={id} className="flex justify-between">
                <div>
                  {Array.isArray(product.name) ? product.name[0] : product.name}

                  <div>
                    {Array.isArray(product.price)
                      ? product.price[0]
                      : product.price}
                  </div>
                </div>
                <div> {quantityById[id]} vendidos</div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BestSellingProducts;
