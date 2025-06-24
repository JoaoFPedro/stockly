import { Card, CardContent } from "@/app/_components/ui/card";

import { SaleDto } from "@/app/_data-access/sales/get-sales";
import { formatCurrency } from "@/app/_helpers/format-currency";
import { DollarSign } from "lucide-react";
import { ReactNode } from "react";

interface CardProps {
  sales?: SaleDto[];
  icon?: ReactNode;
  title?: string;
  totalAmount: number;
}

const SummaryCard = ({ totalAmount }: CardProps) => {
  // console.log("TOTALAMOUNT***", total);
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <DollarSign />
        <span className="text-xs text-slate-500">Receita Total</span>
        <h1 className="text-slate-900">
          {formatCurrency(Number(totalAmount))}
        </h1>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
