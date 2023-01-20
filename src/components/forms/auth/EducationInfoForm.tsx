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
  Select,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { universitiesInTurkey } from "@/common/constants";
import { useSelector } from "react-redux";
import { selectRegisteredUserEmailDomain } from "../../../store/features/auth/auth.slice";
import { motion } from "framer-motion";

const schema = z.object({
  graduationYear: z.string().min(5),
  university: z.string().min(2),
});

export type EducationInfoSchemaType = z.infer<typeof schema>;

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
  onSubmit: (data: EducationInfoSchemaType) => void;
};
export type EducationInfoRef = {
  submit: () => void;
};
export const EducationInfoForm = forwardRef<EducationInfoRef, Props>(
  (props, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<EducationInfoSchemaType>({
      resolver: zodResolver(schema),
      defaultValues: {
        graduationYear: "2025-01-08",
      },
    });
    const { t } = useTranslation();
    const emailDomain = useSelector(selectRegisteredUserEmailDomain);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const processForm: SubmitHandler<EducationInfoSchemaType> = async (
      data: EducationInfoSchemaType,
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
            <div>Register the Unilife</div>
          </HeadWrapper>

          <FormControl isInvalid={Boolean(errors.university)}>
            <FormLabel htmlFor="university">University</FormLabel>
            <Select placeholder="Select option" {...register("university")}>
              {universitiesInTurkey.map((university) => {
                return (
                  <option
                    selected={university.domains.includes(emailDomain)}
                    value={university.name}
                    key={university.name}
                  >
                    {university.name}
                  </option>
                );
              })}
            </Select>
            <Collapse
              in={errors.university?.message ? true : false}
              animateOpacity
            >
              <Box fontSize={"sm"} textColor={"red.500"}>
                <FormErrorMessage>
                  {errors.university && errors.university.message}
                </FormErrorMessage>
              </Box>
            </Collapse>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.graduationYear)}>
            <FormLabel htmlFor="graduationYear">Graduation Year</FormLabel>
            <Input
              type="date"
              placeholder="Your graduation year here"
              {...register("graduationYear", { required: true })}
            />
            <Collapse
              in={errors.graduationYear?.message ? true : false}
              animateOpacity
            >
              <Box fontSize={"sm"} textColor={"red.500"}>
                <FormErrorMessage>
                  {errors.graduationYear && errors.graduationYear.message}
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
