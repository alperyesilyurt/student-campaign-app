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
  tokens: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type AuthState = {
  isLoggedIn: boolean;
  user?: User;
  accesToken?: string;
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
