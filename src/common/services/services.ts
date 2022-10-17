import { Campaign } from "@/components/CampaignCard";
import { LoginFormSchemaType } from "@/modules/Companies";
import { BASE_DEV_URL, ENDPOINTS } from "../constants/constants";
import HttpClient from "./HttpClient";

export const services = {
  getAllCampaigns: async () => {
    try {
      const response = HttpClient.get<Campaign[]>(ENDPOINTS.campaigns);
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
};
