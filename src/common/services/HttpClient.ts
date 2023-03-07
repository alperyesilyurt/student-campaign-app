import axios from "axios";
import { CURRENT_URL } from "../constants/constants";
import { removeTokenFromStorage } from "../utils/storage";

export function addTokenToHeader(token: string) {
  const bearerToken = token.includes("Bearer") ? token : "Bearer " + token;
  HttpClient.defaults.headers.common["Authorization"] = bearerToken;
}

const HttpClient = axios.create({
  baseURL: CURRENT_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});
// if response status is 401 delete token
HttpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("RESPONSE 401");
      removeTokenFromStorage();
    }
    return Promise.reject(error);
  },
);

export default HttpClient;
