"use server";
import { DataTable } from "@/app/_components/ui/data-table";
import { productsColum } from "./_components/table-columns";

import { getProducts } from "../_data-access/product/get-products";

import AddProductButton from "./_components/AddProductButton";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="w-full space-y-8 p-8">
      <div className="w-full">
        <h1 className="py-6 text-sm font-bold text-[#00A180]">Produtos</h1>
        <div className="flex justify-between">
          <h1 className="font-bold">Gestão de produtos</h1>
          <AddProductButton />
        </div>
      </div>
      <DataTable
        columns={productsColum}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
