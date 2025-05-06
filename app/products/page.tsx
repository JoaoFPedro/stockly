"use server";
import { DataTable } from "@/app/_components/ui/data-table";
import { productsColum } from "./_components/table-columns";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { getProducts } from "../_data-access/product/get-products";

const ProductsPage = async () => {
  const products = await getProducts();
  // const plainProducts = prisma.map((products) => ({
  //   ...products,
  //   price: products.price.toNumber(), // ou toString() se preferir manter precisão
  // }));

  return (
    <div className="w-full space-y-8 p-8">
      <div className="w-full">
        <h1 className="py-6 text-sm font-bold text-[#00A180]">Produtos</h1>
        <div className="flex justify-between">
          <h1 className="font-bold">Gestão de produtos</h1>
          <Button className="hover:bg-ghost bg-green-500">
            {" "}
            <PlusIcon /> Adicionar Produto
          </Button>
        </div>
      </div>
      <DataTable columns={productsColum} data={products} />
    </div>
  );
};

export default ProductsPage;
