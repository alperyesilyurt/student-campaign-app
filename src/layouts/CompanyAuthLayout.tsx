import { Box } from "@chakra-ui/react";
import React from "react";

interface CompanyAuthLayoutProps {
  children: React.ReactNode;
}

export const CompanyAuthLayout = ({ children }: CompanyAuthLayoutProps) => {
  return <Box>{children}</Box>;
};
