import instance from "../..";
import type { INavCategory } from "../../../../domain/usecases/nav-categories/INavCategory";

/**
 * Sends a POST request to add a new category with the provided data.
 *
 * @param data - {@link INavCategory} The category data to be added.
 * @returns The response from the server.
 */
export async function addCategory(data: INavCategory) {
  return await instance.post("/nav-categories", data);
}
