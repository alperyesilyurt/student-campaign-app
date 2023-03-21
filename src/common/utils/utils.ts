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

export function trimString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    str = str.substring(0, maxLength - 3) + "...";
  }
  return str;
}
