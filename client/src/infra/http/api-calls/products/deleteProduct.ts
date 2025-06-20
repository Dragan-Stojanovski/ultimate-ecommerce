import instance from "../..";

export async function deleteProduct(id: string): Promise<void> {
  return await instance.delete(`/products/${id}`);
}
