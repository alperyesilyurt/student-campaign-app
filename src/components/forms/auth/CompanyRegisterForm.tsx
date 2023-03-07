import {
  FormControl,
  SimpleGrid,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Checkbox,
  Button,
  Text,
  useColorModeValue,
  Link,
  Box,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z.string().email().min(2),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchemaType = z.infer<typeof schema>;

type Props = {
  handleSubmit: (data: RegisterFormSchemaType) => void;
  isSubmitting: boolean;
};
function CompanyRegisterForm(props: Props) {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "bedo",
      surname: "celayir",
      email: "asd" + Math.random() + "@itu.edu.tr",
      password: "12345678",
    },
  });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const processForm: SubmitHandler<RegisterFormSchemaType> = async (
    data: RegisterFormSchemaType,
  ) => {
    props.handleSubmit(data);
  };
  return (
    <FormControl>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ sm: "10px", md: "26px" }}>
        <Flex direction="column">
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            İsim<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            fontSize="sm"
            ms={{ base: "0px", md: "4px" }}
            placeholder="Bedirhan"
            variant="auth"
            mb="12px"
            size="lg"
            {...register("name", { required: true })}
          />
          <Box mb={"10px"} fontSize={"sm"} textColor={"red.500"}>
            <Text>{errors.name && errors.name.message}</Text>
          </Box>
        </Flex>
        <Flex direction="column">
          <FormLabel
            display="flex"
            ms="4px"
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Soyisim<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            placeholder="Celayir"
            size="lg"
            mb="12px"
            {...register("surname", { required: true })}
          />
          <Box mb={"10px"} fontSize={"sm"} textColor={"red.500"}>
            <Text>{errors.surname && errors.surname.message}</Text>
          </Box>
        </Flex>
      </SimpleGrid>
      <FormLabel
        display="flex"
        ms="4px"
        fontSize="sm"
        fontWeight="500"
        color={textColor}
        mb="8px"
      >
        Email<Text color={brandStars}>*</Text>
      </FormLabel>
      <Input
        isRequired={true}
        variant="auth"
        fontSize="sm"
        type="email"
        placeholder="mail@unilifeapp.com"
        size="lg"
        {...register("email", { required: true })}
      />
      <Box mt={"10px"} mb={"10px"} fontSize={"sm"} textColor={"red.500"}>
        <Text>{errors.email && errors.email.message}</Text>
      </Box>
      <FormLabel
        ms="4px"
        fontSize="sm"
        fontWeight="500"
        color={textColor}
        display="flex"
        mt={"15px"}
      >
        Şifre<Text color={brandStars}>*</Text>
      </FormLabel>
      <InputGroup size="md">
        <Input
          isRequired={true}
          variant="auth"
          fontSize="sm"
          ms={{ base: "0px", md: "4px" }}
          placeholder="Min. 8 karakter"
          size="lg"
          type={show ? "text" : "password"}
          {...register("password", { required: true })}
        />

        <InputRightElement display="flex" alignItems="center" mt="4px">
          <Icon
            color={textColorSecondary}
            _hover={{ cursor: "pointer" }}
            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>
      <Box mt={"10px"} mb={"10px"} fontSize={"sm"} textColor={"red.500"}>
        <Text>{errors.password && errors.password.message}</Text>
      </Box>
      <FormLabel
        ms="4px"
        fontSize="sm"
        fontWeight="500"
        color={textColor}
        display="flex"
        mt={"15px"}
      >
        Şifre tekrar<Text color={brandStars}>*</Text>
      </FormLabel>
      <InputGroup size="md">
        <Input
          isRequired={true}
          variant="auth"
          fontSize="sm"
          ms={{ base: "0px", md: "4px" }}
          placeholder="Min. 8 karakter"
          size="lg"
          type={show ? "text" : "password"}
          {...register("confirmPassword", { required: true })}
        />

        <InputRightElement display="flex" alignItems="center" mt="4px">
          <Icon
            color={textColorSecondary}
            _hover={{ cursor: "pointer" }}
            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>
      <Box mt={"10px"} mb={"10px"} fontSize={"sm"} textColor={"red.500"}>
        <Text>{errors.confirmPassword && errors.confirmPassword.message}</Text>
      </Box>
      <Box mt={"10px"} mb={"10px"} fontSize={"sm"} textColor={"red.500"}>
        <Text>{errors.password && errors.password.message}</Text>
      </Box>
      <Flex mt={"20px"} justifyContent="space-between" align="center" mb="24px">
        <FormControl display="flex" alignItems="start">
          <Checkbox
            id="remember-login"
            colorScheme="brandScheme"
            me="10px"
            mt="3px"
          />
          <FormLabel
            htmlFor="remember-login"
            mb="0"
            fontWeight="normal"
            color={textColor}
            fontSize="sm"
          >
            Kayıt olarak{" "}
            <Link
              href="https://unilifeapp.com/terms-of-service"
              fontWeight="500"
            >
              Şartları
            </Link>{" "}
            ve{" "}
            <Link href="https://unilifeapp.com/privacy-policy" fontWeight="500">
              Gizlilik politikamızı onaylamış olursunuz
            </Link>
          </FormLabel>
        </FormControl>
      </Flex>
      <Button
        variant="brand"
        fontSize="14px"
        fontWeight="500"
        w="100%"
        h="50"
        mb="24px"
        onClick={handleSubmit(processForm)}
        isLoading={props.isSubmitting}
      >
        Hesap oluştur
      </Button>
    </FormControl>
  );
}

export default CompanyRegisterForm;
