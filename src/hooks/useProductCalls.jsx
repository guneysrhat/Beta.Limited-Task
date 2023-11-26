// Library
import { useDispatch } from "react-redux";
import useAxios from "./useAxios";

// Features
import {
  fetchFail,
  fetchStart,
  getSuccess,
  changeSearch,
} from "../features/productSlice";

// Helper
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useProductCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  //!------------- GET CALLS ----------------
  const getProductData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`${url}`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getProductWithSearch = async (url, info) => {
    dispatch(fetchStart());
    try {
      console.log(info);
      if (info !== undefined) {
        const { data } = await axiosWithToken.get(`${url}?name=${info}`);
        dispatch(getSuccess({ data, url }));
        dispatch(changeSearch(true));
      }
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getProducts = () => getProductData("products");
  const getCart = () => getProductData("view-cart");
  const getSearch = (info) => getProductWithSearch("search", info);

  //!------------- POST CALLS ----------------
  const postProductData = async (info, url) => {
    try {
      await axiosWithToken.post(`${url}?id=${info}`);
      toastSuccessNotify(`${url} successfuly added`);
      getProductData("view-cart");
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} can not be added`);
    }
  };

  const postProduct = (info) => postProductData(info, "add-to-cart");

  return {
    getProductData,
    getProducts,
    getCart,
    getSearch,
    postProductData,
    postProduct,
  };
};
export default useProductCalls;
