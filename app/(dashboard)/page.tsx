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
  const totalSellingproducts = dashboardData.totalSellingProducts;
  const totalStock = dashboardData.totalStock;
  const totalProducts = dashboardData.totalProducts;
  const totalSalesAmountDay = dashboardData.totalAmountDay;

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
          totalAmount={totalSalesAmountDay}
          title="Receita Hoje"
          icon={<DollarSign />}
        />
      </div>
      <div className="flex gap-4">
        <SummaryCards
          totalValues={totalSellingproducts}
          title="Vendas totais"
          icon={<CircleDollarSign />}
        />
        <SummaryCards
          totalValues={totalStock}
          title="Total em estoque"
          icon={<BoxIcon />}
        />
        <SummaryCards
          totalValues={totalProducts}
          title="Produtos"
          icon={<ShoppingBasket />}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-[4fr_2fr]">
        <BarChart />
        <BestSellingProducts
          product={bestSellingProducts.map((item) => ({
            name: Array.isArray(item.name) ? item.name[0] : item.name,
            quantity: item.quantity,
            id: Array.isArray(item.id) ? item.id[0] : item.id,
            price: Array.isArray(item.price) ? item.price[0] : item.price,
            status: Array.isArray(item.status) ? item.status[0] : item.status,
          }))}
        />
      </div>
    </div>
  );
}
