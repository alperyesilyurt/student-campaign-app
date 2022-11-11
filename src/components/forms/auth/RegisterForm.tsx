import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import Button from "@/components/styled/button/Button";
import Input from "@/components/styled/input/Input";
import showPwdImg from "../../icons/show-password.svg";
import hidePwdImg from "../../icons/hide-password.svg";
import "./RegisterForm.css";

const schema = z.object({
  username: z.string().min(5),
  email: z.string().email().min(2),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
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
    reset,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(schema),
  });

  const processForm: SubmitHandler<RegisterFormSchemaType> = async (
    data: RegisterFormSchemaType,
  ) => {
    props.handleRegister(data);
    console.log("data", data);
  };

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);

  return (
    <CardWrapper
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >
      <HeadWrapper>
        <div>Welcome!</div>
        <div>Register the Unilife</div>
      </HeadWrapper>

      <label htmlFor="email"> Email</label>
      <Input
        {...register("email", { required: true })}
        name="email"
        type="email"
        placeholder="Your email here"
      />
      {errors.email?.message && <span>{errors.email?.message}</span>}
      <label htmlFor="username"> Username</label>
      <Input
        {...register("username", { required: true })}
        name="username"
        type="username"
        placeholder="Your username here"
      />
      {errors.username?.message && <span>{errors.username?.message}</span>}
      <label htmlFor="password">Password</label>
      <div className="pwd-container">
        <Input
          {...register("password", { required: true })}
          name="password"
          type={isRevealPassword ? "text" : "password"}
          placeholder="Enter your password"
        />
        <img
          title={isRevealPassword ? "Hide password" : "Show password"}
          src={isRevealPassword ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealPassword((prevState) => !prevState)}
        />
      </div>
      {errors.password?.message && <span>{errors.password?.message}</span>}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <div className="pwd-container">
        <Input
          {...register("confirmPassword", { required: true })}
          name="confirmPassword"
          type={isRevealConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
        />
        <img
          title={isRevealConfirmPassword ? "Hide password" : "Show password"}
          src={isRevealConfirmPassword ? hidePwdImg : showPwdImg}
          onClick={() => setIsRevealConfirmPassword((prevState) => !prevState)}
        />
      </div>
      {errors.confirmPassword?.message && (
        <span>{errors.confirmPassword?.message}</span>
      )}

      <Button variant="primary">Register</Button>
    </CardWrapper>
  );
}
