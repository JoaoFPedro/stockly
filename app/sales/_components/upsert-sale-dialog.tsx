"use client";
import { Button } from "@/app/_components/ui/button";
import { useForm } from "react-hook-form";

import {
  Sheet,
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

import { ComboboxOption, ComboboxSales } from "../../_components/ui/combobox";
import { useMemo, useState } from "react";
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
import { z } from "zod";
import { createSale } from "@/app/_actions/sales/create-sales";
import { toast } from "sonner";

import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";
import {
  UpsertSalesSchema,
  upsertSalesSchema,
} from "@/app/_actions/sales/schema";
import { ProductsDto } from "@/app/_data-access/product/get-products";

export interface SelectedProducts {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
interface SalesFormProps {
  productOptions: ComboboxOption[];
  products: ProductsDto[];
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValue?: SelectedProducts[];
  saleId?: string;
}

const UpsertSaleDialog = ({
  saleId,
  productOptions,
  products,
  isOpen,
  setIsOpen,
  defaultValue,
}: SalesFormProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>(
    defaultValue ?? [],
  );

  type FormSchema = z.infer<typeof upsertSalesSchema>;
  const form = useForm<UpsertSalesSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertSalesSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const selectedProduct = products?.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    const existingProduct = selectedProducts.find(
      (product) => product.id === selectedProduct.id,
    );

    // 🔴 Caso: produto já existe na lista e somaria acima do estoque
    if (
      existingProduct &&
      existingProduct.quantity + data.quantity > selectedProduct.stock
    ) {
      form.setError("quantity", {
        message: "Quantidade indisponível",
      });
      return;
    }

    // 🔴 Caso: produto novo, mas a quantidade ultrapassa o estoque
    if (!existingProduct && data.quantity > selectedProduct.stock) {
      form.setError("quantity", {
        message: "Quantidade indisponível",
      });
      return;
    }

    // ✅ Agora podemos atualizar a lista
    if (existingProduct) {
      setSelectedProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                quantity: product.quantity + data.quantity,
              }
            : product,
        ),
      );
    } else {
      setSelectedProducts((prev) => [
        ...prev,
        {
          ...selectedProduct,
          quantity: data.quantity,
          price: Number(selectedProduct.price) * data.quantity,
        },
      ]);
    }

    form.reset(); // ✅ seguro fora do setState
  };
  const handleDelateProductTableButton = (data: SelectedProducts) => {
    setSelectedProducts((prev) =>
      prev.filter((produto) => produto.id !== data.id),
    );
  };
  const { execute: executeCreateSale } = useAction(createSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattenedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda realizada com sucesso");
      setIsOpen(false);
      setSelectedProducts([]);
    },
  });
  const onSubmitSale = () => {
    executeCreateSale({
      id: saleId,
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="!max-w-[700px]">
        <SheetHeader>
          <SheetTitle>Adicionar Venda</SheetTitle>
          <SheetDescription>
            Insira as informações de venda abaixo.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-4"
          >
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
                Adicionar venda
              </Button>
            </div>
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
                  <TableCell>{formatCurrency(Number(product.price))}</TableCell>
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
          <SheetFooter>
            <Button
              type="submit"
              variant="outline"
              onClick={onSubmitSale}
              disabled={selectedProducts.length === 0}
              className="bg-green-500 text-white"
            >
              Finalizar Venda
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UpsertSaleDialog;
