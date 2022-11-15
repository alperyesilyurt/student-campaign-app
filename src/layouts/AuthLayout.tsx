import Footer from "@/components/Footer";
import React, { Fragment } from "react";
import styled from "styled-components";
import { AuthBackground } from "@/components/styled/constants";
import AuthSvg from "@/assets/vectors/auth.svg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10%;
  width: 100%;
  height: 100%;
`;

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AuthBackground>
      <AuthWrapper>
        {children}
        <img src={AuthSvg} alt="React Logo" />
      </AuthWrapper>
      <Footer></Footer>
    </AuthBackground>
  );
}
