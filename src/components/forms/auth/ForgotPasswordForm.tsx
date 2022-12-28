import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "styled-components";

import {
  Button,
  FormErrorMessage,
  Input,
  FormLabel,
  FormControl,
  Collapse,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email().min(2),
});

export type ForgotPasswordSchemaType = z.infer<typeof schema>;

const CardWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 24px 16px;
  background: #ffffff;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;
const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

type Props = {
  handleSubmit: (data: ForgotPasswordSchemaType) => void;
  isSubmitting: boolean;
};

export function ForgotPasswordForm(props: Props) {
  const { isSubmitting } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation();
  const processForm: SubmitHandler<ForgotPasswordSchemaType> = async (
    data: ForgotPasswordSchemaType,
  ) => {
    props.handleSubmit(data);
    reset();
  };

  return (
    <CardWrapper
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >
      <HeadWrapper>
        <Text fontSize={"2xl"}>Hey 🖖</Text>
        <Text>Lets fix your password</Text>
      </HeadWrapper>

      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          {...register("email", { required: true })}
          type="email"
          placeholder="Your email here"
        />
        <Collapse in={errors.email?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>

      <Button
        colorScheme="purple"
        size="lg"
        type="submit"
        isLoading={isSubmitting}
      >
        {t("forms.forgotPasswordForm.recover")}
      </Button>
    </CardWrapper>
  );
}
