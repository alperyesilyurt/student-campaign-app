import { services } from "@/common/services/services";
import { saveTokenToStorage } from "@/common/utils/storage";
import CompanyLoginForm from "@/components/forms/auth/CompanyLoginForm";
import { getCurrentUserThunk, setToken } from "@/store/features";
import { useAppDispatch } from "@/store/hooks";
import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { z } from "zod";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});
export type LoginFormSchemaType = z.infer<typeof schema>;

export const CompanyLogin = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const loginMutation = useMutation(services.login);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (data: LoginFormSchemaType) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        dispatch(setToken(data.data.accessToken));
        dispatch(getCurrentUserThunk());
        saveTokenToStorage(data.data.accessToken);
        toast({
          title: t("forms.loginForm.toast.successTitle"),
          description: t("forms.loginForm.toast.successDescription"),
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        navigate("/campaigns");
      },
      onError: (error) => {
        toast({
          title: t("forms.loginForm.toast.errorTitle"),
          description: t("forms.loginForm.toast.errorDescription"),
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      },
    });
  };
  return (
    <Flex
      maxW={{ base: "100%", md: "max-content" }}
      w="100%"
      mx={{ base: "auto", lg: "0px" }}
      me="auto"
      h="100%"
      alignItems="start"
      justifyContent="center"
      mb={{ base: "30px", md: "60px" }}
      px={{ base: "25px", md: "0px" }}
      mt={{ base: "40px", md: "14vh" }}
      flexDirection="column"
    >
      <Box me="auto">
        <Heading color={textColor} fontSize="36px" mb="10px">
          Giriş yap
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Email adresin ve şifrenle giriş yapabilirsin!
        </Text>
      </Box>
      <Flex
        zIndex="2"
        direction="column"
        w={{ base: "100%", md: "420px" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: "auto", lg: "unset" }}
        me="auto"
        mb={{ base: "20px", md: "auto" }}
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          maxW="100%"
          mt="0px"
        >
          <CompanyLoginForm
            handleLogin={handleLogin}
            isSubmitting={loginMutation.isLoading}
          />
          <Text color={textColorDetails} fontWeight="400" fontSize="14px">
            Kayıt olmak için
            <Link href="/company/register">
              <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                Üye olun
              </Text>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
