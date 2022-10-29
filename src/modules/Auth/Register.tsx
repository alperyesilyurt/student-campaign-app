import { z } from "zod";
import { services } from "@/common/services/services";
import { saveTokenToStorage } from "./../../common/utils";
import styled from "styled-components";
import RegisterForm, {
  RegisterFormSchemaType,
} from "@/components/forms/auth/RegisterForm";
import AuthhSvg from "../../assets/vectors/auth.svg";
import { AuthBackground } from "../../components/styled/constants";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});
export type LoginFormSchemaType = z.infer<typeof schema>;

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10%;
  width: 100%;
  height: 100%;
`;

export default function Register() {
  const registerHandler = async (data: RegisterFormSchemaType) => {
    const response = await services.register(data);
    const { user, token } = response?.data;
    saveTokenToStorage(token);
  };

  return (
    <AuthBackground>
      <AuthWrapper>
        <RegisterForm handleRegister={registerHandler}></RegisterForm>
        <img src={AuthhSvg} alt="React Logo" />
      </AuthWrapper>
    </AuthBackground>
  );
}
