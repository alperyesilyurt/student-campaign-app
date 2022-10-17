import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services } from "@/common/services/services";
import { saveTokenToStorage } from "./../../common/utils";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});
export type LoginFormSchemaType = z.infer<typeof schema>;

export default function Companies() {
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
    const response = await services.login(data);
    const { user, token } = response?.data;
    saveTokenToStorage(token);
  };

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >
      <input
        {...register("email", { required: true })}
        name="email"
        type="email"
      />
      {errors.email?.message && <span>{errors.email?.message}</span>}

      <input
        {...register("password", { required: true, minLength: 6 })}
        name="password"
        type="password"
      />
      {errors.password?.message && <span>{errors.password?.message}</span>}

      <button>Submit</button>
    </form>
  );
}
