import config from "@/config/config";
import axios from "axios";

const AppAxios = axios.create({
  baseURL: config.backendUrl,
  withCredentials: true,
});

export { AppAxios };
