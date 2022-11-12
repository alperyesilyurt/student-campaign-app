import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import {
  Box,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const schema = z
  .object({
    username: z.string().min(5),
    email: z.string().email().min(2),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchemaType = z.infer<typeof schema>;

const CardWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
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
  handleRegister: (data: RegisterFormSchemaType) => void;
};

export default function RegisterForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation();

  const processForm: SubmitHandler<RegisterFormSchemaType> = async (
    data: RegisterFormSchemaType,
  ) => {
    props.handleRegister(data);
  };

  return (
    <CardWrapper
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >
      <HeadWrapper>
        <div>Welcome!</div>
        <div>Register the Unilife</div>
      </HeadWrapper>

      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          placeholder="Your email here"
          {...register("email", { required: true })}
        />
        <Collapse in={errors.email?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.username)}>
        <FormLabel htmlFor="username">Full name</FormLabel>
        <Input
          type="username"
          placeholder="Your username here"
          {...register("username", { required: true })}
        />
        <Collapse in={errors.username?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          placeholder="Your password here"
          {...register("password", { required: true })}
        />
        <Collapse in={errors.password?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.confirmPassword)}>
        <FormLabel htmlFor="confirmPassword">Confirm your password</FormLabel>
        <Input
          type="password"
          placeholder="Your confirmPassword here"
          {...register("confirmPassword", { required: true })}
        />
        <Collapse
          in={errors.confirmPassword?.message ? true : false}
          animateOpacity
        >
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>
      <Button
        mt={"6"}
        colorScheme="purple"
        size="lg"
        type="submit"
        isLoading={false}
      >
        {t("forms.registerForm.register")}
      </Button>
    </CardWrapper>
  );
}
