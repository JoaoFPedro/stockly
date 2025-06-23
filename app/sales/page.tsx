import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";

import SaleButton from "./_components/sale-button";
import { serializeDecimal } from "../utils/serializeObjects";
import { DataTable } from "../_components/ui/data-table";
import { salesColum } from "./_components/table-columns";
import { getSales } from "../_data-access/sales/get-sales";
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubTitle,
  HeaderTitle,
} from "../_components/header";

const SalesPage = async () => {
  const products = await getProducts();
  const sales = await getSales();
  const productsOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  const productsSerializados = serializeDecimal(products);
  const tableData = sales.map((sale) => ({
    ...sale,
    products: productsSerializados,
    productsOptions,
  }));
  return (
    <div className="w-full space-y-8 p-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Vendas</HeaderTitle>
          <HeaderSubTitle>Gestão de vendas</HeaderSubTitle>
        </HeaderLeft>
        <HeaderRight>
          <SaleButton
            productOptions={productsOptions}
            products={productsSerializados}
          />{" "}
        </HeaderRight>
      </Header>
      <DataTable columns={salesColum} data={tableData} />
    </div>
  );
};

export default SalesPage;
