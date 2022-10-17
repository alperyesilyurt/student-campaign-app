import axios from "axios";
import { BASE_DEV_URL } from "../constants/constants";
import { getTokenFromStorage } from "../utils";

const HttpClient = axios.create({
  baseURL: BASE_DEV_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    Authorization: getTokenFromStorage(),
  },
});

export default HttpClient;
