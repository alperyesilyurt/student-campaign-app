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
  getCampaignByID: async (id: string) => {
    const response = HttpClient.get(`${ENDPOINTS.campaigns}/${id}`);
    return response;
  },
  getFeaturedCampaigns: async () => {
    const response = HttpClient.get(ENDPOINTS.campaignsFeatured);
    return response;
  },
  login: async (loginForm: LoginFormSchemaType) => {
    const response = HttpClient.post(ENDPOINTS.auth.login, loginForm);
    return response;
  },
  register: async (registerForm: RegisterFormSchemaType) => {
    const response = HttpClient.post(ENDPOINTS.auth.register, registerForm);
    return response;
  },
};
