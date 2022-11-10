import { Campaign } from "@/components/CampaignCard";
import { LoginFormSchemaType } from "../../components/forms/auth/LoginForm";
import { RegisterFormSchemaType } from "../../components/forms/auth/RegisterForm";

import { ENDPOINTS } from "../constants/constants";
import HttpClient from "./HttpClient";

export const services = {
  getAllCampaigns: async () => {
    const response = HttpClient.get(ENDPOINTS.campaigns);
    return response;
  },
  getSingleCampaignDetail: async (value: { id: string }) => {
    try {
      const response = HttpClient.get(
        `${ENDPOINTS.singleCampaignDetail}/${value.id}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  login: async (loginForm: LoginFormSchemaType) => {
    try {
      const response = HttpClient.post(ENDPOINTS.auth.login, loginForm);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  register: async (registerForm: RegisterFormSchemaType) => {
    try {
      const response = HttpClient.post(ENDPOINTS.auth.register, registerForm);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};
