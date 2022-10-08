import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});
type FormSchemaType = z.infer<typeof schema>;

export default function Companies() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
  });

  const processForm: SubmitHandler<FormSchemaType> = async (
    data: FormSchemaType
  ) => {
    await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(data),
    });

    reset();
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
