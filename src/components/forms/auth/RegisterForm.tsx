import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import Button from "@/components/styled/button/Button";

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
  gap: 20px;

  max-width: 350px;

  background-color: white;
  padding: 24px 16px;
  border: 1px solid gray;
  border-radius: 12px;
  margin-top: 20px;
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
    data: RegisterFormSchemaType
  ) => {
    props.handleRegister(data);
    console.log("data",data)
  };

  

  return (
    <CardWrapper onSubmit={handleSubmit(processForm)}
    style={{ display: "flex", flexDirection: "column", width: 300 }}>

          <label htmlFor="email"> Email</label>
        <input
          {...register("email", { required: true })}
          name="email"
          type="email"
        />
        {errors.email?.message && <span>{errors.email?.message}</span>}
        <label htmlFor="username"> Username</label>
        <input
          {...register("username", { required: true })}
          name="username"
          type="username"
        />
        {errors.username?.message && <span>{errors.username?.message}</span>}
        <label htmlFor="password"> Password</label>

        <input
          {...register("password", { required: true })}
          name="password"
          type="password"
        />
        {errors.password?.message && <span>{errors.password?.message}</span>}
        <label htmlFor="confirmPassword"> Confirm Password</label>

        <input
          {...register("confirmPassword", { required: true })}
          name="confirmPassword"
          type="password"
        />
        {errors.confirmPassword?.message && <span>{errors.confirmPassword?.message}</span>}

        <Button type="primary" >Submit</Button>
    </CardWrapper>
  );
}
