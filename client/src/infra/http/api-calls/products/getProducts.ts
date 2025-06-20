import instance from "../..";
import type { IProductResponse } from "../../../../domain/usecases/product/IProductResponse";

export async function getProducts(): Promise<IProductResponse[]> {
  return await instance.get("/products");
}
