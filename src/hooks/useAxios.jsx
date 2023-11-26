// Library
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/";

//* Axios Instance for Public API Request
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  //* Axios Instance for Private API Request
  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { "Session-ID": `${token}` },
  });

  return { axiosWithToken };
};

export default useAxios;
