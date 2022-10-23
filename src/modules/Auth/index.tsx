import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services } from "@/common/services/services";
import { saveTokenToStorage } from "./../../common/utils";
import styled from "styled-components";
import Button from "@/components/styled/button/Button";
import LoginForm from "@/components/forms/auth/LoginForm";
import { useState } from "react";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});
export type LoginFormSchemaType = z.infer<typeof schema>;

const CardWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  max-width: 350px;
  
  background-color: white;
  padding: 24px 16px;
  border: 1px solid gray ;
  border-radius: 12px;
  margin-top: 20px;

`

type AuthType = 'login' | 'register';

export default function Auth() {
  const [authType, setAuthType] = useState<AuthType>('login');

  const loginHandler = async (data: LoginFormSchemaType) => {
    const response = await services.login(data);
    const { user, token } = response?.data;
    saveTokenToStorage(token);
  }

  return (
    <div>
      <Button onClick={() => setAuthType(authType === 'login' ? 'register' : 'login')} type="secondary"> Switch Auth Type</Button>
      {authType === 'login' && <LoginForm handleLogin={loginHandler}></LoginForm>}
      {authType === 'register' && <div>Register</div>}
    </div>
  );
}
