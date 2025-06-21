import instance from "../..";
import type { IProductResponse } from "../../../../domain/usecases/product/IProductResponse";

export async function getProducts(
  title?: string,
  category?: string
): Promise<{ data: IProductResponse[] }> {
  return await instance.post("/products/list", {
    title: title || "",
    category: category || "",
  });
}