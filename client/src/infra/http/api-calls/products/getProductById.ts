import instance from "../..";
import type { IProductResponse } from "../../../../domain/usecases/product/IProductResponse";

export async function getProductById(id: string): Promise<IProductResponse> {
  const response = await instance.get(`/products/${id}`);
  return response.data;
}
