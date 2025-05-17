"use server";
import { DataTable } from "@/app/_components/ui/data-table";
import { productsColum } from "./_components/table-columns";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { getProducts } from "../_data-access/product/get-products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../_components/ui/dialog";
import UpsertProduct from "../_components/upsert-product-dialog";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="w-full space-y-8 p-8">
      <div className="w-full">
        <h1 className="py-6 text-sm font-bold text-[#00A180]">Produtos</h1>
        <div className="flex justify-between">
          <h1 className="font-bold">Gestão de produtos</h1>
          <UpsertProduct />
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
