import { toast } from "react-hot-toast";
import * as AuthApi from "../api/AuthRequests";
export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
    toast.success("Login Successful")
  } catch (error) {
    toast.error(error.response.data)
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../home", { replace: true });
    toast.success("Signup Successful")
  } catch (error) {
    toast.error( error.response.data.message)
    dispatch({ type: "AUTH_FAIL" });
  }
};


export const logout = ()=> async(dispatch)=> {
  dispatch({type: "LOG_OUT"})
}
