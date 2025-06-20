import instance from "../..";
import type { INavCategory } from "../../../../domain/usecases/nav-categories/INavCategory";

export async function getCategories():Promise<INavCategory[]> {
  return await instance.get("/nav-categories");
}
