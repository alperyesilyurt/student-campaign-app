import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services } from "@/common/services/services";
import styled from "styled-components";
import { saveTokenToStorage } from "@/common/utils";
import Button from "@/components/styled/button/Button";

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
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(schema),
  });

  const processForm: SubmitHandler<LoginFormSchemaType> = async (
    data: LoginFormSchemaType
  ) => {
    props.handleLogin(data);
  };

  return (
    <CardWrapper
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >
          <HeadWrapper>
            <div>Welcome back!</div>
            <div>Login your data to continue...</div>
          </HeadWrapper>
      <label
        style={{
        
          borderRadius: "10px",
        }}
        htmlFor="email"
      >
        {" "}
        E-mail
      </label>
      <input
        style={{
          padding: "16px 16px",
          border: "1px solid #D9D9D9",
          borderRadius: "10px",
        }}
        {...register("email", { required: true })}
        name="email"
        type="email"
        placeholder="Your email here"

        
      />

      {errors.email?.message && <span>{errors.email?.message}</span>}

      <label htmlFor="email"> Password</label>
      <input
        style={{
          padding: "16px 16px",
          border: "1px solid #D9D9D9",
          borderRadius: "10px",
        }}
        {...register("password", { required: true, minLength: 6 })}
        name="password"
        type="password"
        placeholder="Enter your password"

      />
      {errors.password?.message && <span>{errors.password?.message}</span>}

      <Button type="primary"> Login</Button>
    </CardWrapper>
  );
}
