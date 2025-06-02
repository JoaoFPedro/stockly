"use client";
import { Button } from "@/app/_components/ui/button";
import { useForm } from "react-hook-form";

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";

import {
  UpsertSaleSchema,
  upsertSalesSchema,
} from "@/app/_actions/get-products/schema";
import { ComboboxOption, ComboboxSales } from "../../_components/ui/combobox";
import { useMemo, useState } from "react";
import { Product } from "@/app/generated/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/format-currency";
import { TrashIcon } from "lucide-react";

interface SalesFormProps {
  setIsOpen?: (isOpen: boolean) => void;
  productOptions: ComboboxOption[];
  products: Product[];
}
interface SelectedProducts {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
const UpsertSaleDialog = ({ productOptions, products }: SalesFormProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(
    [],
  );
  console.log("PRODUCTS****", products);
  const form = useForm<UpsertSaleSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertSalesSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });
  const onSubmit = async (data: any) => {
    // console.log("alalalalalallalala", data);
    // setIsOpen?.(false);
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;
    setSelectedProducts((currentProducts) => {
      const existingProducts = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );

      if (existingProducts) {
        return currentProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          quantity: data.quantity,
          price: Number(selectedProduct.price) * data.quantity,
        },
      ];
    });
    form.reset();
  };
  const handleDelateProductTableButton = (data: SelectedProducts) => {
    setSelectedProducts((prev) =>
      prev.filter((produto) => produto.id !== data.id),
    );
    return console.log("TABLEPRODUCTS", data);
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);
  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Adicionar Venda</SheetTitle>
        <SheetDescription>
          Insira as informações de venda abaixo.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="flex">
                <FormLabel>Nome do Produto:</FormLabel>
                <FormControl>
                  <ComboboxSales
                    {...field}
                    placeholder="Escolha o produto"
                    options={productOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="flex">
                <FormLabel>Quantidade:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SheetFooter>
            <div className="flex w-full gap-3">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  type="reset"
                  className="bg-muted w-1/2 border border-gray-300 text-black hover:bg-gray-100"
                >
                  Cancelar
                </Button>
              </SheetClose>
              <Button
                type="submit"
                className="w-1/2 bg-green-500 text-white hover:bg-green-600"
              >
                Finalizar
              </Button>
            </div>
          </SheetFooter>
        </form>
      </Form>
      <div className="p-4">
        <Table>
          <TableCaption>Lista de produtos adicionados à venda.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{Number(product.price)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  {formatCurrency(product.price * product.quantity)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelateProductTableButton(product)}
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>{formatCurrency(productTotal)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </SheetContent>
  );
};

export default UpsertSaleDialog;
