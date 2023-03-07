import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import {
  Box,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const CardWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 23px 44px;
  background: #ffffff;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  width: 400px;
`;
const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  h1 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 37px;
    color: #000000;
  }
`;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = z.object({
  email: z.string().email().min(2),
  phoneNumber: z.string().regex(phoneRegExp, "Phone number is not valid"),
  message: z.string().min(6),
  contactMethod: z.string(),
});

export type ContactFormSchema = z.infer<typeof schema>;

type Props = {
  handleFormSubmit: (data: ContactFormSchema) => void;
  isLoading: boolean;
};

export default function ContactForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation();
  const { isLoading } = props;
  const processForm: SubmitHandler<ContactFormSchema> = async (
    data: ContactFormSchema,
  ) => {
    props.handleFormSubmit(data);
  };

  return (
    <CardWrapper onSubmit={handleSubmit(processForm)}>
      <HeadWrapper>
        <h1>Contact Us</h1>
      </HeadWrapper>
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          size={"lg"}
          type="email"
          placeholder="Your email here"
          {...register("email", { required: true })}
        />
        <Collapse in={errors.email?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.phoneNumber)}>
        <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
        <Input
          size={"lg"}
          placeholder="544-339-08-00"
          type={"number"}
          {...register("phoneNumber", { required: true })}
        />
        <Collapse
          in={errors.phoneNumber?.message ? true : false}
          animateOpacity
        >
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.phoneNumber && errors.phoneNumber.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.message)}>
        <FormLabel htmlFor="message">Your message</FormLabel>
        <Textarea
          placeholder="Your message here"
          {...register("message", { required: true })}
          size="sm"
        />
        <Collapse in={errors.message?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.message && errors.message.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.contactMethod)}>
        <FormLabel htmlFor="contactMethod">Your Contact Method</FormLabel>
        <Select
          {...register("contactMethod", { required: true })}
          /* placeholder="Select contact method " */
          defaultValue={"phone"}
        >
          <option value="phone">Phone</option>
          <option value="email">Email</option>
        </Select>
        <Collapse in={errors.message?.message ? true : false} animateOpacity>
          <Box fontSize={"sm"} textColor={"red.500"}>
            <FormErrorMessage>
              {errors.contactMethod && errors.contactMethod.message}
            </FormErrorMessage>
          </Box>
        </Collapse>
      </FormControl>

      <Button
        mt={"6"}
        colorScheme="green"
        size="lg"
        type="submit"
        isLoading={isLoading}
      >
        {t("forms.contactForm.contact")}
      </Button>
    </CardWrapper>
  );
}
