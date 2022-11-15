import { z } from "zod";
import { services } from "@/common/services/services";
import { saveTokenToStorage } from "./../../common/utils";
import RegisterForm, {
  RegisterFormSchemaType,
} from "@/components/forms/auth/RegisterForm";
import { AuthLayout } from "@/layouts/AuthLayout";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});
export type LoginFormSchemaType = z.infer<typeof schema>;

export default function Register() {
  const registerHandler = async (data: RegisterFormSchemaType) => {
    const response = await services.register(data);
    const { user, token } = response?.data;
    saveTokenToStorage(token);
  };

  return (
    <AuthLayout>
        <RegisterForm handleRegister={registerHandler}></RegisterForm>
    </AuthLayout>
  );
}
