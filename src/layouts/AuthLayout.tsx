import Footer from "@/components/Footer";
import React, { Fragment } from "react";
import styled from "styled-components";
import { AuthBackground } from "@/components/styled/constants";
import AuthSvg from "@/assets/vectors/auth.svg";
import Navbar from "@/components/Navbar";
import { Box, Button, Container, Flex, Icon, Image } from "@chakra-ui/react";
import UniLifeLogo from "@/components/icons/UniLifeLogo";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10%;
  width: 100%;
  height: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export function AuthLayout({ children }: AuthLayoutProps) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <AuthBackground>
      <AuthWrapper>
        <Flex direction={"column"}>
          <Flex alignItems={"center"} my={12} gap={8}>
            <Button onClick={goBack} variant={"ghost"}>
              <Icon as={FiChevronLeft} w="30px" h="30px" />
            </Button>
            <Link to="/">
              <UniLifeLogo height="70px" />
            </Link>
          </Flex>
          {children}
        </Flex>
        <Image
          display={{ base: "none", md: "block" }}
          src={AuthSvg}
          alt="Unilife"
        />
      </AuthWrapper>
    </AuthBackground>
  );
}
