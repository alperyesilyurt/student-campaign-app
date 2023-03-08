import { services } from "@/common/services/services";
import CompanyRegisterForm, {
  RegisterFormSchemaType,
} from "@/components/forms/auth/CompanyRegisterForm";
import { loginThunk, selectIsLoggedIn } from "@/store/features";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export const CompanyRegister = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();

  if (isLoggedIn) {
    return <>Allready loggedin</>;
  }
  const registerMutation = useMutation(services.register);

  const handleSubmit = (data: RegisterFormSchemaType) => {
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        dispatch(
          loginThunk({
            email: data.email,
            password: data.password,
          }),
        );
        navigate("/dashboard/company");
        toast({
          title: "Hoş geldin",
          status: "success",
          position: "top",
          description: "Şirket bilgilerini ekleyerek başlayabilirsin.",
        });
      },
      onError: (error) => {
        toast({
          title: "Kayıt olunamadı",
          position: "top",
          status: "error",
          description: "Lütfen bilgilerinizi kontrol edin.",
        });
      },
    });
  };

  return (
    <Flex
      w="100%"
      maxW="max-content"
      mx={{ base: "auto", lg: "0px" }}
      me="auto"
      h="100%"
      justifyContent="center"
      mb={{ base: "30px", md: "60px" }}
      px={{ base: "25px", md: "0px" }}
      mt={{ base: "40px", md: "8vh" }}
      flexDirection="column"
    >
      <Box me="auto">
        <Heading
          color={textColor}
          fontSize={{ base: "34px", lg: "36px" }}
          mb="10px"
        >
          Kayıt olun
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Hesabınızı oluştururak kampanyalarınızı yönetebilirsiniz.
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
        <CompanyRegisterForm
          handleSubmit={handleSubmit}
          isSubmitting={registerMutation.isLoading}
        />
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="start"
        maxW="100%"
        mt="0px"
      >
        <Text color={textColorDetails} fontWeight="400" fontSize="sm">
          Already a member?
          <Link href="/auth/sign-in">
            <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
              Sign in
            </Text>
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};
