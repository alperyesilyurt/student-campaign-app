import { z } from "zod";
import { services } from "@/common/services/services";
import LoginForm from "@/components/forms/auth/LoginForm";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { getCurrentUserThunk, setToken } from "@/store/features";
import { saveTokenToStorage } from "@/common/utils/storage";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});
export type LoginFormSchemaType = z.infer<typeof schema>;

export default function Login() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const loginMutation = useMutation(services.login);
  const toast = useToast();
  const navigate = useNavigate();
  const loginHandler = async (data: LoginFormSchemaType) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        dispatch(setToken(data.data.accessToken));
        dispatch(getCurrentUserThunk());
        saveTokenToStorage(data.data.accessToken);
        toast({
          title: t("forms.loginForm.toast.successTitle"),
          description: t("forms.loginForm.toast.successDescription"),
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        navigate("/campaigns");
      },
      onError: (error) => {
        toast({
          title: t("forms.loginForm.toast.errorTitle"),
          description: t("forms.loginForm.toast.errorDescription"),
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };

  if (loginMutation.isError) {
    toast({
      title: t("forms.loginForm.toast.errorTitle"),
      description: t("forms.loginForm.toast.errorDescription"),
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }
  if (loginMutation.isSuccess) {
  }

  return (
    <LoginForm
      handleLogin={loginHandler}
      isSubmitting={loginMutation.isLoading}
    ></LoginForm>
  );
}
