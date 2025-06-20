import instance from "../..";
import type { IEditProductRequest } from "../../../../domain/usecases/product/IEditProductRequest";
import type { IProductResponse } from "../../../../domain/usecases/product/IProductResponse";


/**
 * Updates a product by ID.
 * @param id - The ID of the product to update.
 * @param data - The fields to update.
 * @returns The updated product.
 */
export async function editProduct(
  id: string,
  data: IEditProductRequest
): Promise<IProductResponse> {
  const response = await instance.patch(`/products/${id}`, data);
  return response.data;
}
