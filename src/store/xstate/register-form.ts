import { createMachine } from "xstate";
import { assign } from "@xstate/immer"

interface Step1 {
  email: string;
  password: string;
  errorMessage: string;
}

interface Step2 {
  name: string;
  errorMessage: string;
}

interface Step3 {
  name: string;
  errorMessage: string;
}

interface Step4 {
  name: string;
  errorMessage: string;
}

interface MultiStepFormMachineContext {
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step4: Step4;
}

type MultiStepFormMachineEvent =
  | { type: "back" }
  | { type: "submit_step1"; info: Step1 }
  | { type: "submit_step2"; info: Step2 }
  | { type: "submit_step3"; info: Step3 };

const registerFormMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCcxQJawC5mQMQHtkBbAOmzAAcBGU9CAGzAGJYBXAI2PSwG0AGALqJQlArB7oCAOxEgAnogAsSgEykAnAGYA7Fo07+ANmqr+S7QBoQAD0TUlO0gA5Vz5-x3Ot-Z9X4ArAEAvsHWqBgU+ERkFDTknNxYWOjSUMwQMmB00gBuBADW2QDGqACGOADCBMSUZdLyAsJIIGISKTJyighBRqQ+1FrOBgGqqkoB1nYI1K6kDqb8-tQabjrUoeFomDjRJOQ48excPClpzLjIRKSUDBUAZjGkpWAVYNW19Y1Ccm2SnS1ur1+kshiMxhMpvY5gszMtVs51psQBEdrhCPs4up6ExmBwysUCk1fuJ-rIWtMdAElJotCslqsgqodNZunoNKQAhoAs4jLyjBoBdTkaiohjYodsYwWMcksSWn8OuTQNNVALSCojPxdEpTGYdGrWfYVlpOV5VAEjEZdCtuSLtmKnliEidkql0plpNlUvkis8arcwDgAMqS+WiUlKuSqpzaDQqC3MrnarRGma6mnOHmDHQaaiLLT2yK7cUHKjqWWnd0XZBXZA3O5YR77YoBpghsM-BWRqTK2z2fjqJS6My6A2+Bxp-zUzRGca6AWOLTCsIoh0lp2HU04lj4wnh1o9gEqxBaLX9Nbx0xBTyqKdqU156daxFKLMbVeijeYrd0aWsRIeAPRVe2jRALQ5AIzzGdw6WZbUjCnPknF1PMPA0YZrUcIs0T2CUqFNSs3XOT1vTyQoSjbIMwFDAjgKPPtpgAWmoK0zWMLw9C0NVqEtKc9ACFw1X4DRtAmZlVELT913RTcCJdJIznSS5rluB4nlbWp2xord6PaUCKVPbjSCtcZXCMA1qHZfifBMtxhmMVRVkFIxQlXaQCAgOA5C-WSfyoWgdxJfTj37BB+DTBNaXZQwTDMCwpK2Ys-Pwo5AOIqBgrJMDwrTYEBjBKkIRCaTkrwssaCyqNDIQJi3zTZdHxfYcLTpESNBwx1-MoKUmCqgyTx6bR+izQdczUVj6oUAcvBMhwdEMYxViRUrcNLZ0iKU-rQtVUgIWcCxmUFESFs8KcVloAxETnHQtTpD8krWuSeu2xjEDqwSFoCXjb21DRB1TaaEEFQSMJ5bx3CtJRzE679Uu3aVXpy-NaEMHQJv4TGJgMDQkMRDULvQzCtGw1auvhhSqzSJGapR0g0YxrGuVzKcPH4envDGb7c18LxYZSiqtBpwbrXpzxGfMZncaB3iMI1NQbtmXj9Fcsm4Yqmkgu7EK3oQC12eGW6DBUWZHBUNMxjcDUFvHEGJkStcyvWw4lGFsKzHUQ2BXR3UDp9i3BkgpZWPWAIBOcfm8Ld5jVAcdiLMRLRuJMPigbVGkMLUJRrR5MSpNCIA */
  createMachine(
    {
      context: {
        step1: {
          email: "",
          password: "",
          errorMessage: "",
        },
        step2: { name: "", errorMessage: "" },
        step3: { name: "", errorMessage: "" },
        step4: { name: "", errorMessage: "" },
      },
      id: "registerForm",
      initial: "step1",
      states: {
        step1: {
          initial: "idle",
          states: {
            idle: {
              on: {
                submit_step1: {
                  target: "submitting",
                },
              },
            },
            submitting: {
              invoke: {
                src: "createCompany",
                id: "createCompany",
                onDone: [
                  {
                    target: "#registerForm.step2.idle",
                    actions: (context, event) => {
                      console.log("context event", event)
                      context.step1 = event.data;
                    },
                  },
                ],
                onError: [
                  {
                    target: "idle",
                    // actions: "assignErrorMessageToContext",
                  },
                ],
              },
            },
          },
        },
        step2: {
          initial: "idle",
          states: {
            idle: {
              on: {
                back: {
                  target: "#registerForm.step1.idle",
                },
                submit_step2: {
                  target: "submitting",
                },
              },
            },
            submitting: {
              invoke: {
                src: "completeStep2",
                id: "completeStep2",
                onDone: [
                  {
                    target: "#registerForm.step3.idle",
                    actions: (context, event) => ({
                      step2: {
                        name: event.data.name,
                      },
                    }),
                  },
                ],
                onError: [
                  {
                    target: "idle",
                    actions: "assignErrorMessageToContext",
                  },
                ],
              },
            },
          },
        },
        step3: {
          initial: "idle",
          states: {
            idle: {
              on: {
                back: {
                  target: "#registerForm.step2.idle",
                },
                submit_step3: {},
              },
            },
            submitting: {
              invoke: {
                src: "completeStep3",
                id: "completeStep3",
                onDone: [
                  {
                    target: "#registerForm.step4.idle",
                    actions: (context, event) => ({
                      step3: event.data,
                    }),
                  },
                ],
                onError: [
                  {
                    target: "#registerForm.step3.idle",
                    actions: "assignErrorMessageToContext",
                  },
                ],
              },
            },
          },
        },
        step4: {
          initial: "idle",
          states: {
            idle: {},
          },
        },
        sucess: {
          type: "final",
        },
      },
    },
    {
      services: {
        createCompany: (context, event) => {
          console.log(event)
          if (event.type !== "submit_step1") {
            throw new Error("Invalid event type");
          }
          return new Promise((resolve, reject) => {
            resolve({
              email: event.info.email,
              password: event.info.password,
            });
          });
        },
        completeStep2: (context, event) => {
          return new Promise((resolve, reject) => {
            resolve({
              name: "Enes",
            });
          });
        },
        completeStep3: (context, event) =>
          new Promise((resolve, reject) => {
            resolve({
              name: "Enes",
            });
          }),
      },
      actions: {
        assignErrorMessageToContext: assign(
          (
            context,
            event,
          ) => {
            return {
              step1: context.step1,
            };
          },
        ),
      },
    },
  );

export default registerFormMachine;
