import axios from "axios";
import Cookies from "js-cookie";

const axiosRequest = axios.create({
  baseURL: "https://chat-app-three-swart.vercel.app/",
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
