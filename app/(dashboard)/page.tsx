import Header, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "../_components/header";
import { getDashboard } from "../_data-access/get-dashboard-values";
import { getSales } from "../_data-access/sales/get-sales";
import SummaryCard from "./_components/SummaryCard";

export default async function Home() {
  const sales = await getSales();
  const dashboardData = await getDashboard();
  const totalAmount = dashboardData.totalAmount;
  return (
    <div className="w-full space-y-8 p-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubTitle>Visão geral dos dados</HeaderSubTitle>
        </HeaderLeft>
      </Header>
      <div className="flex gap-6">
        <SummaryCard sales={sales} totalAmount={totalAmount} />
        <SummaryCard totalAmount={500} />
      </div>
    </div>
  );
}
