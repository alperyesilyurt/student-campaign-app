import { EducationInfoSchemaType } from "@/components/forms/auth/EducationInfoForm";
import { PersonalInfoSchemeType } from "@/components/forms/auth/PersonalInfoForm";
import { RegisterFormSchemaType } from "@/components/forms/auth/RegisterForm";
import { VerifyEmailFormSchemeType } from "@/components/forms/auth/VerifyEmail";

export interface User {
  _id: string;
  email: string;
  name: string;
  surname: string;
  isUserActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
  tokens: Token[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  studentInfo: StudentInfo;
}

export interface Root {
  _id: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  isUserActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
  tokens: Token[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StudentInfo {
  personalInfo: PersonalInfo;
}

export interface PersonalInfo {
  interests: any[];
}

export interface Token {
  deviceId: any;
  refreshToken: string;
}

export type AuthState = {
  isLoggedIn: boolean;
  authToast: {
    title: string;
    description?: string | undefined;
    status: "success" | "error" | "warning" | "info" | "loading" | undefined;
  } | null;
  isSubmittingStudent: boolean;
  user?: User;
  accesToken?: string;
  isStudentRegisterSuccess: boolean;
  registerSteps: {
    studentSteps: Record<StudentFormSteps, FormStepValues | null>;
    student: {
      basicInfo: RegisterFormSchemaType | null;
      personalInfo: PersonalInfoSchemeType | null;
      educationInfo: EducationInfoSchemaType | null;
      verifyEmail: VerifyEmailFormSchemeType | null;
    };
  };
  step: number;
  isRegistering: boolean;
  registeredAt?: Date;
};

export type StudentFormSteps =
  | "basicInfo"
  | "personalInfo"
  | "educationInfo"
  | "verifyEmail";
export type FormStepValues = Record<string, any | undefined>;

export type StepFormStep = {
  step: StudentFormSteps;
  title: string;
  component: any;
  onSubmit: (values: FormStepValues) => void;
};

export interface FormComponent {
  submit: () => void;
}
