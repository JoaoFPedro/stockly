import {
  BoxIcon,
  CircleDollarSign,
  DollarSign,
  ShoppingBasket,
} from "lucide-react";
import Header, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "../_components/header";
import { getDashboard } from "../_data-access/get-dashboard-values";
import { getSales } from "../_data-access/sales/get-sales";
import SummaryCard from "./_components/SummaryCard";
import SummaryCards from "./_components/SummaryCards";
import BarChart from "../_components/BarChart";
import BestSellingProducts from "../_components/BestSellingProducts";

export default async function Home() {
  const sales = await getSales();
  const dashboardData = await getDashboard();
  const totalAmount = dashboardData.totalAmount;
  const bestSellingProducts = dashboardData.totalBestSellingProduct;

  return (
    <div className="w-full space-y-8 p-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubTitle>Visão geral dos dados</HeaderSubTitle>
        </HeaderLeft>
      </Header>
      <div className="flex gap-6">
        <SummaryCard
          sales={sales}
          totalAmount={totalAmount}
          title="Receita Total"
          icon={<DollarSign />}
        />
        <SummaryCard
          totalAmount={500}
          title="Receita Hoje"
          icon={<DollarSign />}
        />
      </div>
      <div className="flex gap-4">
        <SummaryCards
          totalValues={1040}
          title="Vendas totais"
          icon={<CircleDollarSign />}
        />
        <SummaryCards
          totalValues={20.0}
          title="Total em estoque"
          icon={<BoxIcon />}
        />
        <SummaryCards
          totalValues={60}
          title="Produtos"
          icon={<ShoppingBasket />}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-1 gap-6 overflow-hidden">
        <BarChart />
        <BestSellingProducts product={bestSellingProducts} />{" "}
      </div>
    </div>
  );
}
