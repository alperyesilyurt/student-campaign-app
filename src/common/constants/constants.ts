const BASE_LOCAL_URL = "http://localhost:8080/";
const BASE_DEV_URL = "https://dev.unilifeapp.net/";

const isDev = import.meta.env.DEV;
export const CURRENT_URL = isDev ? BASE_LOCAL_URL : BASE_DEV_URL;

export const ENDPOINTS = {
  campaigns: "v1/campaigns",
  campaignsFeatured: "v1/campaigns/featured",
  auth: {
    login: "v1/authentication/login",
    register: "v1/authentication/register",
    verifyEmail: "v1/users/verify-email",
    me: "v1/authentication/me",
    updateStudent: "v1/authentication/student/update-me",
  },
  categories: "v1/categories",
  contacts: "v1/contacts",
  universities: "v1/universities",
  myCampaigns: "v1/campaigns/my-campaigns",
};

export const STORAGE_KEYS = {
  token: "TOKEN",
};
