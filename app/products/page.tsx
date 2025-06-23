"use server";
import { DataTable } from "@/app/_components/ui/data-table";
import { productsColum } from "./_components/table-columns";

import { getProducts } from "../_data-access/product/get-products";

import AddProductButton from "./_components/AddProductButton";
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubTitle,
  HeaderTitle,
} from "../_components/header";

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <>
      <div className="w-full space-y-8 p-8">
        <Header>
          <HeaderLeft>
            <HeaderTitle>Produtos</HeaderTitle>
            <HeaderSubTitle>Gestão de produtos</HeaderSubTitle>
          </HeaderLeft>
          <HeaderRight>
            <AddProductButton />
          </HeaderRight>
        </Header>

        <DataTable
          columns={productsColum}
          data={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </>
  );
};

export default ProductsPage;
