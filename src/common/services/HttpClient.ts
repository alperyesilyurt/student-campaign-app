import axios from "axios";
import { CURRENT_URL } from "../constants/constants";
import { getTokenFromStorage } from "../utils";

const HttpClient = axios.create({
  baseURL: CURRENT_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    Authorization: getTokenFromStorage(),
  },
});

export default HttpClient;
