import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { SalesColum } from "./_components/table-columns";
import { salesMock } from "./mock/salesMock";

const SalesPage = () => {
  const mockTest = salesMock;
  return (
    <div className="w-full space-y-8 p-8">
      <div className="w-full">
        <h1 className="py-6 text-sm font-bold text-[#00A180]">Vendas</h1>
        <div className="flex justify-between">
          <h1 className="font-bold">Gestão de Vendas</h1>
          {/* <AddProductButton /> */}
          <Button>+ Adicionar Venda</Button>
        </div>
      </div>
      <DataTable
        columns={SalesColum}
        data={JSON.parse(JSON.stringify(mockTest))}
      />
    </div>
  );
};

export default SalesPage;
