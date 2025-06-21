import { getUserOwn } from "../../../infra/http/api-calls/users/getUserOwn";
import { type Dispatch } from "@reduxjs/toolkit";

// Action Types
const SET_USER = "SET_USER";
const CLEAR_USER = "CLEAR_USER";

interface SetUserAction {
  type: typeof SET_USER;
  payload: any; // Use a more specific type for your user data if possible
}

interface ClearUserAction {
  type: typeof CLEAR_USER;
}

// Async Action Creator
export const fetchUserDirectly = async (dispatch: Dispatch) => {
  try {
    const data = await getUserOwn();
    dispatch({
      type: "SET_USER",
      payload: data.data,
    });
  } catch (error) {
    dispatch({ type: "CLEAR_USER" });
  }
};
export type UserActionTypes = SetUserAction | ClearUserAction;
