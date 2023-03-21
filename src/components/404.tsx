import React from "react";
import {
  Box,
  Center,
  Text,
  Button,
  VStack,
  chakra,
  keyframes,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import UnilifeTextLogo from "@/components/common/unilife-text-logo";
import UnilifeGlob from "@/components//common/unilife-glob";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `;

  const GradientBackground = chakra(Box, {
    baseStyle: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background:
        "linear-gradient(30deg, rgba(255, 98, 0, 0.25), rgba(255, 173, 0, 0.25), rgba(196, 255, 0, 0.25), rgba(0, 255, 173, 0.25), rgba(0, 210, 255, 0.02), rgba(98, 0, 255, 0.02))",
      backgroundSize: "600% 600%",
      animation: `${gradientAnimation} 30s ease infinite`,
    },
  });

  return (
    <Box position="relative" minHeight="100vh">
      <Navbar />
      <GradientBackground />
      <Center h="100%">
        <VStack
          spacing={6}
          mt={20}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <div>
            <Flex justifyContent={"center"} flexDir={"column"} align={"center"}>
              <UnilifeGlob />
              <Box zIndex={2} mt={"-16"}>
                <UnilifeTextLogo />
              </Box>
            </Flex>
          </div>
          <VStack gap={2}>
            <Text fontSize="4xl" fontWeight="bold" mt={"12"}>
              Oops! 404
            </Text>
            <Text fontSize="xl">Aradığın sayfayı bulamadık.</Text>
            <Button mt={4} onClick={() => navigate("/")} colorScheme="green">
              Anasayfaya dön
            </Button>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default NotFoundPage;
