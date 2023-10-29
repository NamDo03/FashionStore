import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest } from "../requestMethod";
import { toast } from "react-toastify";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    toast.success("Logged in Successfully.");
  } catch (err) {
    console.log(err);
    dispatch(loginFailure());
    toast.error("Logged in Failed.");

  }
};