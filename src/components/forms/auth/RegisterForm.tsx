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
import { forwardRef, useImperativeHandle, useRef } from "react";
import { motion } from "framer-motion";

const schema = z
  .object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z.string().email().min(2),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
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
  onSubmit: (data: RegisterFormSchemaType) => void;
};
export type RegisterFormRef = {
  submit: () => void;
};
export const RegisterForm = forwardRef<RegisterFormRef, Props>((props, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "bedo",
      surname: "bedo",
      email: "asd" + Math.random() + "@itu.edu.tr",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });
  const { t } = useTranslation();

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const processForm: SubmitHandler<RegisterFormSchemaType> = async (
    data: RegisterFormSchemaType,
  ) => {
    props.onSubmit(data);
  };

  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        submitButtonRef?.current?.click();
      },
    }),
    [handleSubmit],
  );

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

      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          type="name"
          placeholder="Your name here"
          {...register("name", { required: true })}
        />
        <Collapse in={errors.name?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="surname">Surname</FormLabel>
        <Input
          type="surname"
          placeholder="Your surname here"
          {...register("surname", { required: true })}
        />
        <Collapse in={errors.surname?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.surname && errors.surname.message}
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
        ref={submitButtonRef}
        visibility={"hidden"}
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
});
