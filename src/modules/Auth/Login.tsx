import { z } from "zod";
import { services } from "@/common/services/services";
import styled from "styled-components";
import LoginForm from "@/components/forms/auth/LoginForm";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AuthLayout } from "@/layouts/AuthLayout";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});
export type LoginFormSchemaType = z.infer<typeof schema>;

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
    <AuthLayout>
      <LoginForm
        handleLogin={loginHandler}
        isSubmitting={loginResponse.isLoading}
      ></LoginForm>
    </AuthLayout>
  );
}
