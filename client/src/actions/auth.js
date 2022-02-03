import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index.js";
import { notify } from "../util/notify";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    notify("Successfully Sign In", "success");
    history.push("/");
  } catch (error) {
    notify("Failed To Sign In", "error");
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    notify("Successfully Sign Up", "success");
    history.push("/");
  } catch (error) {
    notify("Failed To Create User", "error");
    console.log(error);
  }
};
