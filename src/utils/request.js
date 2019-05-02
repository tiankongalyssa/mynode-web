import axios from "axios";
// import { getUser } from "@/utils/auth";

const service = axios.create({
  // baseURL: "http://10.10.32.34:7300/mock/5c888f44eeb9ff0a4ced42cd",
  baseURL: "http://localhost:9001",
  timeout: 3000,
  // headers: { Accredit: "Bearer " + getUser().token }
});
export default service;
