import { useMutation } from "@tanstack/react-query";
import { services } from "@/common/services/services";
import { LoginFormSchemaType } from "@/modules/Auth/Login";

export const useLogin = (loginForm: LoginFormSchemaType) => {
  const login = useMutation(["auth/login"], () => {
    return services.login(loginForm);
  });

  return login;
};
