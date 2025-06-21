import instance from "../..";
import type { IAuthenticateUserRequest } from "../../../../domain/usecases/users/IAuthenticateUserRequest";

/**
 * Authenticates an user.
 *
 * @param data - The login details of the new user.
 * @returns A promise that resolves to the result of the user registration.
 */
export async function authenticateUser(data: IAuthenticateUserRequest) {
  const result = await instance.post("/login", data);
  return result;
}
