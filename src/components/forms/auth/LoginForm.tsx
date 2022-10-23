import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services } from "@/common/services/services";
import styled from "styled-components";
import { saveTokenToStorage } from '@/common/utils';
import Button from '@/components/styled/button/Button';

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
  
    max-width: 350px;
  
    background-color: white;
    padding: 24px 16px;
    border: 1px solid gray ;
    border-radius: 12px;
    margin-top: 20px;
`

type Props = {
    handleLogin: (data: LoginFormSchemaType) => void;
}


export default function LoginForm(props: Props) {
    const 
    {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormSchemaType>({
        resolver: zodResolver(schema),
    } );

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
            <label htmlFor="email"> E-mail</label>
            <input
                {...register("email", { required: true })}
                name="email"
                type="email"
            />
            {errors.email?.message && <span>{errors.email?.message}</span>}
            
            <label htmlFor="email"> Password</label>
            <input
                {...register("password", { required: true, minLength: 6 })}
                name="password"
                type="password"
            />
            {errors.password?.message && <span>{errors.password?.message}</span>}

            <Button type="primary"> Submit</Button>
        </CardWrapper>
    )
}