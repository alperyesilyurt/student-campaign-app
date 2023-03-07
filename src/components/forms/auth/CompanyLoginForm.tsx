import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Flex,
  Checkbox,
  Button,
  useColorModeValue,
  Text,
  Link,
  Box,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Email geçersiz" }).min(2),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
});

export type LoginFormSchemaType = z.infer<typeof schema>;

type Props = {
  handleLogin: (data: LoginFormSchemaType) => void;
  isSubmitting: boolean;
};
function CompanyLoginForm(props: Props) {
  const { isSubmitting } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(schema),
  });

  const [show, setShow] = React.useState(false);
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const handleClick = () => setShow(!show);

  const processForm: SubmitHandler<LoginFormSchemaType> = async (
    data: LoginFormSchemaType,
  ) => {
    props.handleLogin(data);
    reset();
  };

  return (
    <FormControl>
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
        ms={{ base: "0px", md: "0px" }}
        type="email"
        placeholder="mail@unilifeapp.com"
        fontWeight="500"
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
      >
        Password<Text color={brandStars}>*</Text>
      </FormLabel>
      <InputGroup size="md">
        <Input
          isRequired={true}
          fontSize="sm"
          placeholder="Min. 8 karakter"
          size="lg"
          type={show ? "text" : "password"}
          variant="auth"
          {...register("password", { required: true, minLength: 8 })}
        />{" "}
        <Box mt={"10px"} mb={"10px"} fontSize={"sm"} textColor={"red.500"}>
          <Text>{errors.password && errors.password.message}</Text>
        </Box>
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
      <Flex justifyContent="space-between" align="center" mb="24px">
        <FormControl display="flex" alignItems="center">
          <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
          <FormLabel
            htmlFor="remember-login"
            mb="0"
            fontWeight="normal"
            color={textColor}
            fontSize="sm"
          >
            Keep me logged in
          </FormLabel>
        </FormControl>
        <Link href="/auth/forgot-password">
          <Text color={textColorBrand} fontSize="sm" w="124px" fontWeight="500">
            Şifremi unuttum?
          </Text>
        </Link>
      </Flex>
      <Button
        fontSize="sm"
        variant="brand"
        fontWeight="500"
        w="100%"
        h="50"
        mb="24px"
        isLoading={isSubmitting}
        onClick={handleSubmit(processForm)}
      >
        Giriş yap
      </Button>
    </FormControl>
  );
}

export default CompanyLoginForm;
