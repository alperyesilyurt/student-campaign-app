import { createMachine } from "xstate";

const registerFormMachine = createMachine(
  {
    id: "registerForm",
    initial: "idle",
    context: {
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {
        email: "",
        password: "",
        passwordConfirmation: "",
      },
    },
    states: {
      idle: {
        on: {
          CHANGE_EMAIL: {
            actions: "changeEmail",
          },
          CHANGE_PASSWORD: {
            actions: "changePassword",
          },
          CHANGE_PASSWORD_CONFIRMATION: {
            actions: "changePasswordConfirmation",
          },
          SUBMIT: "submitting",
        },
      },
      submitting: {
        invoke: {
          src: "submit",
          onDone: {
            target: "success",
          },
          onError: {
            target: "error",
            actions: "setErrors",
          },
        },
      },
      success: {
        type: "final",
      },
      error: {
        on: {
          CHANGE_EMAIL: {
            target: "idle",
            actions: "changeEmail",
          },
          CHANGE_PASSWORD: {
            target: "idle",
            actions: "changePassword",
          },
          CHANGE_PASSWORD_CONFIRMATION: {
            target: "idle",
            actions: "changePasswordConfirmation",
          },
        },
      },
    },
  },
  {
    actions: {
      changeEmail: assign({
        email: (_, event) => event.value,
      }),
      changePassword: assign({
        password: (_, event) => event.value,
      }),
      changePasswordConfirmation: assign({
        passwordConfirmation: (_, event) => event.value,
      }),
      setErrors: assign({
        errors: (_, event) => event.data,
      }),
    },

    services: {
      submit: async (context) => {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: context.email,
            password: context.password,
            passwordConfirmation: context.passwordConfirmation,
          }),
        });

        if (response.ok) {
          return response.json();
        } else {
          throw await response.json();
        }
      },
    },
  },
);

export default registerFormMachine;
