import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "./_components/combobox-sales";
import { SalesColum } from "./_components/table-columns";
import UpsertSaleDialog from "./_components/upsert-sale-dialog";
import { salesMock } from "./mock/salesMock";

const SalesPage = async () => {
  const mockTest = salesMock;
  const products = await getProducts();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  console.log("PRODUCTS****", products);
  return (
    <div className="w-full space-y-8 p-8">
      <div className="w-full">
        <h1 className="py-6 text-sm font-bold text-[#00A180]">Vendas</h1>
        <div className="flex justify-between">
          <h1 className="font-bold">Gestão de Vendas</h1>
          {/* <AddProductButton /> */}
          {/* <SaleButton /> */}
          <Sheet>
            <SheetTrigger asChild className="bg-green-500">
              <Button className="hover:bg-ghost">Adicionar venda </Button>
            </SheetTrigger>
            <UpsertSaleDialog products={productOptions} />
          </Sheet>
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
