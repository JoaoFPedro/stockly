import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";

import SaleButton from "./_components/sale-button";
import { serializeDecimal } from "../utils/serializeObjects";
import { DataTable } from "../_components/ui/data-table";
import { salesColum } from "./_components/table-columns";
import { getSales } from "../_data-access/sales/get-sales";

const SalesPage = async () => {
  const products = await getProducts();
  const sales = await getSales();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  const productsSerializados = serializeDecimal(products);
  return (
    <div className="w-full space-y-8 p-8">
      <div className="w-full">
        <h1 className="py-6 text-sm font-bold text-[#00A180]">Vendas</h1>
        <div className="flex justify-between">
          <h1 className="font-bold">Gestão de Vendas</h1>
          {/* <AddProductButton /> */}
          <SaleButton
            productOptions={productOptions}
            products={productsSerializados}
          />
        </div>
      </div>
      <DataTable
        columns={salesColum}
        data={JSON.parse(JSON.stringify(sales))}
      />
    </div>
  );
};

export default SalesPage;
