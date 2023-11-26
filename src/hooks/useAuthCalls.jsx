// Library
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//Features
import {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  fetchFail,
} from "../features/authSlice";

//Hooks
import { axiosPublic } from "./useAxios";

//Helper
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("createsession", userInfo);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/BetaLimited");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Login can not be performed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout performed");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
    }
  };

  return {
    login,
    logout,
  };
};

export default useAuthCalls;
