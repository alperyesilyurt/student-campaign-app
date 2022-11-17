import registerFormMachine from "@/store/xstate/register-form";
import { Button } from "@chakra-ui/react";
import { useMachine } from "@xstate/react";
import { Fragment } from "react";

export const CompanyRegister = () => {
  const [state, send] = useMachine(registerFormMachine);

  return (
    <Fragment>
      {JSON.stringify(state.context)}
      {state.can("submit_step1") && (
        <Button
          onClick={() => {
            send("submit_step1", { info: { email: "inceenes10@gmail.com", password: "123456" } });
          }}
        >
          Submit Step 1
        </Button>
      )}
      {state.can("submit_step2") && (
        <Button
          onClick={() => {
            send("submit_step2", { info: { name: "enes ince" } });
          }}
        >
          Submit Step 2
        </Button>
      )}
      {state.can("back") && <Button onClick={() => send("back")}>back</Button>}
    </Fragment>
  );
};
