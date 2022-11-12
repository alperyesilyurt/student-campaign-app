import { z } from "zod";
import { services } from "@/common/services/services";
import { saveTokenToStorage } from "./../../common/utils";
import styled from "styled-components";
import LoginForm from "@/components/forms/auth/LoginForm";
import AuthSvg from "../../assets/vectors/auth.svg";
import { AuthBackground } from "../../components/styled/constants";
import { useLogin } from "@/common/hooks/auth";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const loginResponse = useMutation(services.login);
  const toast = useToast();
  const loginHandler = async (data: LoginFormSchemaType) => {
    // const response = await services.login(data);
    loginResponse.mutate(data);

    // const { user, token } = response?.data;
    // saveTokenToStorage(token);
  };

  if (loginResponse.isError) {
    toast({
      title: t("forms.loginForm.toast.errorTitle"),
      description: t("forms.loginForm.toast.errorDescription"),
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }
  if (loginResponse.isSuccess) {
    toast({
      title: t("forms.loginForm.toast.successTitle"),
      description: t("forms.loginForm.toast.successDescription"),
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }

  return (
    <AuthBackground>
      <AuthWrapper>
        <LoginForm
          handleLogin={loginHandler}
          isSubmitting={loginResponse.isLoading}
        ></LoginForm>

        <img src={AuthSvg} alt="React Logo" />
      </AuthWrapper>
    </AuthBackground>
  );
}
