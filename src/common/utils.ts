import { AuthState } from "@/store/features";
import { STORAGE_KEYS } from "./constants/constants";

export const saveTokenToStorage = (token: string) => {
  window.localStorage.setItem(STORAGE_KEYS.token, token);
};

export const getTokenFromStorage = () => {
  const token = window.localStorage.getItem(STORAGE_KEYS.token);
  return `Bearer ${token}`;
};

export const queryStringBuild = (params: any) => {
  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .map((k) => esc(k) + "=" + esc(params[k]))
    .join("&");
  return query;
};

export const formatMinutesAndSeconds = (minutes: number, seconds: number) => {
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const sanitizeStudentInfo = (
  obj: AuthState["registerSteps"]["studentSteps"],
) => {
  const result = {
    studentInfo: {
      personalInfo: obj.personalInfo,
      educationInfo: obj.educationInfo,
    },
  };

  return result;
};
