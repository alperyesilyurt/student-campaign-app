import { z } from "zod";
import { services } from "@/common/services/services";
import { saveTokenToStorage } from "./../../common/utils";
import styled from "styled-components";
import LoginForm from "@/components/forms/auth/LoginForm";
import AuthSvg from "../../assets/vectors/auth.svg";
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

const Wrapper = styled.div`
  background-image: url("../../assets/vectors/auth-background.svg");
`;

export default function Login() {
  const loginHandler = async (data: LoginFormSchemaType) => {
    const response = await services.login(data);
    const { user, token } = response?.data;
    saveTokenToStorage(token);
  };

  return (
    <AuthBackground>
      <AuthWrapper>
        <LoginForm handleLogin={loginHandler}></LoginForm>

        <img src={AuthSvg} alt="React Logo" />
      </AuthWrapper>
    </AuthBackground>
  );
}
