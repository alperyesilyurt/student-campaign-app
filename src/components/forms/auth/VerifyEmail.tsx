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
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useSelector } from "react-redux";
import { selectRegistirationDate } from "@/store/features";
import { useCountdown } from "@/common/hooks/use-countdownt";
import { add } from "date-fns";
import { formatMinutesAndSeconds } from "@/common/utils";
import { motion } from "framer-motion";

const schema = z.object({
  emailVerifyToken: z.string().length(6),
});

export type VerifyEmailFormSchemeType = z.infer<typeof schema>;

const CardWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 24px 16px;
  background: #ffffff;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;
const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
type Props = {
  onSubmit: (data: VerifyEmailFormSchemeType) => void;
};
export type VerifyEmailRef = {
  submit: () => void;
};

export const VerifyEmailForm = forwardRef<VerifyEmailRef, Props>(
  (props, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<VerifyEmailFormSchemeType>({
      resolver: zodResolver(schema),
      defaultValues: {
        emailVerifyToken: "",
      },
    });
    const { t } = useTranslation();

    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const registeredAt = useSelector(selectRegistirationDate)!;
    const [days, hours, minutes, seconds] = useCountdown(
      add(new Date(registeredAt), { minutes: 5 }),
    );

    const processForm: SubmitHandler<VerifyEmailFormSchemeType> = async (
      data: VerifyEmailFormSchemeType,
    ) => {
      props.onSubmit(data);
    };

    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          submitButtonRef?.current?.click();
        },
      }),
      [handleSubmit],
    );

    return (
      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0.3, x: -200 }}
        transition={{ duration: 0.5 }}
      >
        <CardWrapper
          onSubmit={handleSubmit(processForm)}
          style={{ display: "flex", flexDirection: "column", width: 300 }}
        >
          <HeadWrapper>
            <div>Welcome!</div>
            <div>Verify your email address</div>
            <Text fontFamily={"body"}>
              {formatMinutesAndSeconds(minutes, seconds)}
            </Text>
          </HeadWrapper>

          <FormControl isInvalid={Boolean(errors.emailVerifyToken)}>
            <FormLabel htmlFor="emailVerifyToken">Confirm your email</FormLabel>
            <Input
              type="text"
              placeholder="_ _ _ _ _ _"
              {...register("emailVerifyToken", { required: true })}
            />
            <Collapse
              in={errors.emailVerifyToken?.message ? true : false}
              animateOpacity
            >
              <Box fontSize={"sm"} textColor={"red.500"}>
                <FormErrorMessage>
                  {errors.emailVerifyToken && errors.emailVerifyToken.message}
                </FormErrorMessage>
              </Box>
            </Collapse>
          </FormControl>

          <Button
            ref={submitButtonRef}
            visibility={"hidden"}
            mt={"6"}
            colorScheme="purple"
            size="lg"
            type="submit"
            isLoading={false}
          >
            {t("forms.registerForm.register")}
          </Button>
        </CardWrapper>
      </motion.div>
    );
  },
);
