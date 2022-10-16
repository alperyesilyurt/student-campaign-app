import { Campaign } from "@/components/CampaignCard";
import { BASE_DEV_URL, ENDPOINTS } from "../constants/constants";
import HttpClient from "./HttpClient";

export const services = {
  getAllCampaigns: async () => {
    try {
      const response = HttpClient.get<Campaign[]>(BASE_DEV_URL + ENDPOINTS.campaigns);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};