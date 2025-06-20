import instance from "../..";

export async function deleteCategory(id:string):Promise<void> {
    return await instance.delete(`/nav-categories/${id}`)
}