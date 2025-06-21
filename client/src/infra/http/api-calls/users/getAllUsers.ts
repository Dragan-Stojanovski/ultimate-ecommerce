import instance from "../..";

/**
 * Fetches users from the server with optional filters and pagination.
 *
 * @param params Optional parameters: { username?: string, page?: number, limit?: number }
 */
export async function getAllUsers(
  params: { username?: string; page?: number; limit?: number } = {}
) {
  const result = await instance.post("/get-users", params);
  return result;
}
