import axios from "axios";

const AppAxios = axios.create({ baseURL: "http://localhost:3000" });

export { AppAxios };
