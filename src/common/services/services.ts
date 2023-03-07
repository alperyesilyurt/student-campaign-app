import { Campaign } from "@/components/PageSpecific/Campaign/CampaignCard";
import { LoginFormSchemaType } from "@/components/forms/auth/LoginForm";
import { RegisterFormSchemaType } from "@/components/forms/auth/RegisterForm";
import { ContactFormSchema } from "@/components/forms/contact/ContactForm";
import { University, User } from "@/store/features";
import { Category } from "@/store/features/campaigns/campaign.interface";

import { ENDPOINTS } from "../constants/constants";
import HttpClient from "./HttpClient";
import { CampaignResponse } from "../types/campaign.interface";

export const services = {
  getAllCampaigns: async (query: string) => {
    const response = await HttpClient.get<Campaign[]>(
      ENDPOINTS.campaigns + "?" + query,
    );
    return response.data;
  },
  getCampaignByID: async (id: string) => {
    const response = await HttpClient.get<Campaign>(
      `${ENDPOINTS.campaigns}/${id}`,
    );
    return response.data;
  },
  getCampaignWithCodeByID: async (id: string) => {
    const response = await HttpClient.get<CampaignResponse>(
      `${ENDPOINTS.campaigns}/with-code/${id}`,
    );
    return response.data;
  },
  getFeaturedCampaigns: async () => {
    const response = await HttpClient.get<Campaign[]>(
      ENDPOINTS.campaignsFeatured,
    );
    return response.data;
  },
  login: async (loginForm: LoginFormSchemaType) => {
    const response = HttpClient.post<{
      accessToken: string;
      refreshToken: string;
    }>(ENDPOINTS.auth.login, loginForm);
    return response;
  },
  getCurrentUser: async () => {
    const response = await HttpClient.get<User>(ENDPOINTS.auth.me);
    return response.data;
  },
  updateStudentInfo: async (studentInfo: any) => {
    const response = HttpClient.patch(
      ENDPOINTS.auth.updateStudent,
      studentInfo,
    );
    return response;
  },

  register: async (registerForm: RegisterFormSchemaType) => {
    const response = HttpClient.post(ENDPOINTS.auth.register, registerForm);
    return response;
  },
  getAllCampaignCategories: async () => {
    const response = await HttpClient.get<Category[]>(ENDPOINTS.categories);
    return response.data;
  },
  createContact: async (contact: ContactFormSchema) => {
    const response = HttpClient.post(ENDPOINTS.contacts, contact);
    return response;
  },
  forgotPassword: async (email: string) => {
    /*   const response = HttpClient.post(ENDPOINTS.auth.forgotPassword, { email });
    return response; */
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  },
  getAllUniversities: async () => {
    const response = await HttpClient.get<University[]>(ENDPOINTS.universities);
    return response.data;
  },
  verifyEmail: async ({
    email,
    verificationCode,
  }: {
    email: string;
    verificationCode: string;
  }) => {
    const response = await HttpClient.get<User>(
      ENDPOINTS.auth.verifyEmail +
        `?email=${email}&verificationCode=${verificationCode}`,
    );
    return { data: response.data, status: response.status };
  },
};
