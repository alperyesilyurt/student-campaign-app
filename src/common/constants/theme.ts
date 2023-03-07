import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#278fff",
  },
};

const buttonVariants = {
  variants: {
    linkStyleLogin: {
      textDecoration: "none",
      color: "#3D3D3D",
      border: "2.5px solid #7CF2B8",
      borderRadius: "10px",
      padding: "16px 46px",
    },
  },
};

export const theme = extendTheme({ colors });
export const buttonTheme = extendTheme({ buttonVariants });
