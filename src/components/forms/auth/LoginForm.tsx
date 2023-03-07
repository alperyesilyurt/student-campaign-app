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
  password: z.string().min(6),
});

export type LoginFormSchemaType = z.infer<typeof schema>;

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
  handleLogin: (data: LoginFormSchemaType) => void;
  isSubmitting: boolean;
};

export default function LoginForm(props: Props) {
  const { isSubmitting } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation();
  const processForm: SubmitHandler<LoginFormSchemaType> = async (
    data: LoginFormSchemaType,
  ) => {
    props.handleLogin(data);
    reset();
  };

  return (
    <CardWrapper
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >
      <HeadWrapper>
        <Text fontSize={"2xl"}>Merhaba 👋 </Text>
        <Text>Giriş yaparak devam edebilirsin</Text>
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

      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          placeholder="Enter your password"
        />
        <Collapse in={errors.password?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>

      <Flex justifyContent={"space-between"}>
        <Button variant={"link"}>
          <Link to={"/auth/forgot-password"}>Forgot password?</Link>
        </Button>
        <Button variant={"link"}>
          <Link to={"/auth/register"}>Signup</Link>
        </Button>
      </Flex>

      <Button
        colorScheme="green"
        size="lg"
        type="submit"
        isLoading={isSubmitting}
      >
        {t("forms.loginForm.login")}
      </Button>
    </CardWrapper>
  );
}
