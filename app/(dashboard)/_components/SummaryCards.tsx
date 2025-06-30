import { Card, CardContent } from "@/app/_components/ui/card";

import { SaleDto } from "@/app/_data-access/sales/get-sales";
import { ReactNode } from "react";

interface CardProps {
  sales?: SaleDto[];
  icon?: ReactNode;
  title?: string;
  totalValues: number;
}

const SummaryCards = ({ totalValues, title, icon }: CardProps) => {
  // console.log("TOTALAMOUNT***", total);
  return (
    <Card className="w-full">
      <CardContent>
        {icon}
        <span className="text-xs text-slate-500">{title}</span>
        <h1 className="text-slate-900">{totalValues}</h1>
      </CardContent>
    </Card>
  );
};

export default SummaryCards;
