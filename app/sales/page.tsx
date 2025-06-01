import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import UpsertSaleDialog from "./_components/upsert-sale-dialog";

const SalesPage = async () => {
  const products = await getProducts();

  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

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
            <UpsertSaleDialog
              productOptions={productOptions}
              products={products}
            />
          </Sheet>
        </div>
      </div>
      {/* <DataTable
        columns={SalesColum}
        data={JSON.parse(JSON.stringify(mockTest))}
      /> */}
    </div>
  );
};

export default SalesPage;
