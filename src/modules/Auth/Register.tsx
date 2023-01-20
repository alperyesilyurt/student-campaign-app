import { z } from "zod";
/* import { services } from "@/common/services/services";
import { saveTokenToStorage } from "@/common/utils"; */
import { RegisterForm } from "@/components/forms/auth/RegisterForm";
import { Box, Button, Flex, Progress, useCounter } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import {
  FormComponent,
  registerThunk,
  selectStepAndIsRegistering,
  setStep,
  setStudentStepValues,
  StepFormStep,
  verifyEmail,
} from "@/store/features";
import { useAppDispatch } from "@/store/hooks";
import { EducationInfoForm } from "@/components/forms/auth/EducationInfoForm";
import { PersonalInfoForm } from "@/components/forms/auth/PersonalInfoForm";
import { useSelector } from "react-redux";
import { VerifyEmailForm } from "@/components/forms/auth/VerifyEmail";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});

export type LoginFormSchemaType = z.infer<typeof schema>;

export default function Register() {
  const [progress, setProgress] = useState(0);
  const { isRegistering, step } = useSelector(selectStepAndIsRegistering);

  /*   const registerHandler = async (data: RegisterFormSchemaType) => {
    const response = await services.register(data);
    const { user, token } = response?.data;
    saveTokenToStorage(token);
  }; */

  const dispatch = useAppDispatch();
  const ref = useRef<FormComponent>(null);

  const steps = useMemo<StepFormStep[]>(() => {
    const stepList: StepFormStep[] = [
      {
        step: "basicInfo",
        title: "Register",
        component: RegisterForm,
        onSubmit: (data: any) => {
          dispatch(registerThunk(data));
        },
      },
      {
        step: "educationInfo",
        title: "educationInfo",
        component: EducationInfoForm,
        onSubmit: (data: any) => {
          dispatch(
            setStudentStepValues({ step: "educationInfo", values: data }),
          );
          dispatch(setStep("+"));
        },
      },
      {
        step: "personalInfo",
        title: "personalInfo",
        component: PersonalInfoForm,
        onSubmit: (data: any) => {
          dispatch(
            setStudentStepValues({ step: "personalInfo", values: data }),
          );
          dispatch(setStep("+"));
          console.log("🚀 ~ file: Register.tsx:75 ~ steps ~ data", data);
        },
      },
      {
        step: "verifyEmail",
        title: "verifyEmail",
        component: VerifyEmailForm,
        onSubmit: (data: any) => {
          dispatch(verifyEmail(data));
        },
      },
    ];
    return stepList;
  }, [dispatch, step]);

  const handleSubmit = (data: any) => {
    steps[step]?.onSubmit(data);
  };

  const submitNext = () => {
    ref.current?.submit();
    setProgress(progress + 12);
    /*     setStep(step + 1);
     */
  };

  const stepDefinition = useMemo(() => steps[step], [steps, step]);
  const Component = stepDefinition?.component;

  return (
    <div>
      <Box>
        <>
          <Progress
            colorScheme="green"
            size="lg"
            value={progress}
            my={4}
            rounded={"lg"}
            isIndeterminate={isRegistering}
            isAnimated={true}
            transition={"ease"}
            transitionDuration={"1000s"}
            transitionProperty={"all"}
            transitionTimingFunction={"ease"}
          />
        </>
      </Box>

      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0.3, x: -200 }}
        transition={{ duration: 0.5 }}
      >
        <Component ref={ref} onSubmit={handleSubmit}></Component>
      </motion.div>

      <Box my={4}>
        <Flex justifyContent={"space-between"}>
          <Button onClick={() => setProgress(progress - 12)}>Back</Button>
          <Button onClick={() => submitNext()}>
            {step + 1 >= steps.length ? "Finish" : "Next"}
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
