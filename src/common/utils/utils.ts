import { AuthState } from "@/store/features";

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
