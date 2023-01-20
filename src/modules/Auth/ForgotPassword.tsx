import { services } from "@/common/services/services";
import {
  ForgotPasswordForm,
  ForgotPasswordSchemaType,
} from "@/components/forms/auth/ForgotPasswordForm";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

type Props = {};

export default function ForgotPassword({}: Props) {
  const toast = useToast();
  const { t } = useTranslation();
  const forgotPasswordMutation = useMutation(services.forgotPassword);

  const handle = (data: ForgotPasswordSchemaType) => {};
  return (
    <div>
      <ForgotPasswordForm
        isSubmitting={forgotPasswordMutation.isLoading}
        handleSubmit={handle}
      />
    </div>
  );
}
