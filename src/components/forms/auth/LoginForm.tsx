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
} from "@chakra-ui/react";
import { useEffect } from "react";

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
};

export default function LoginForm(props: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(schema),
  });

  const processForm: SubmitHandler<LoginFormSchemaType> = async (
    data: LoginFormSchemaType
  ) => {
    props.handleLogin(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <CardWrapper
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >
      <HeadWrapper>
        <div>Welcome back!</div>
        <div>Login your data to continue...</div>
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

      <Button
        colorScheme="purple"
        size="lg"
        type="submit"
        isLoading={isSubmitting}
      >
        Login
      </Button>
    </CardWrapper>
  );
}
