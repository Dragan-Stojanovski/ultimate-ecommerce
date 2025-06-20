import instance from "../..";
import type { IAddProductRequest } from "../../../../domain/usecases/product/IAddProductRequest";


export async function addProduct(data: IAddProductRequest) {
  return await instance.post("/products", data);
}
