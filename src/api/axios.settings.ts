import axios from "axios";
import Cookies from "js-cookie";

const axiosRequest = axios.create({
  baseURL: process.env.APP_MODE ? process.env.APP_DEV : process.env.APP_PROD,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRequest.interceptors.request.use((config) => {
  if (config.headers && Cookies.get("token")) {
    config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  }

  return config;
});

export default axiosRequest;
