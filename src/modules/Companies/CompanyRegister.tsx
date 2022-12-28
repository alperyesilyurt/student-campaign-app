import { useAppSelector } from "@/store/hooks";
import { Fragment } from "react";

export const CompanyRegister = () => {
  const { company, isLoggedIn } = useAppSelector((state) => state.company);

  if (!isLoggedIn) {
    return null;
  }

  return <Fragment>Company register</Fragment>;
};
