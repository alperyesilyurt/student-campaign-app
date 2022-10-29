import styled from "styled-components";
import authImage from "../../assets/vectors/auth-background.svg";

export const borderRadiusSizes = {
  xsmall: "4px",
  small: "6px",
  medium: "10px",
  large: "24px",
  xlarge: "48px",
};

export const fontWeights = {
  light: "300",
  regular: "400",
  semibold: "600",
  bold: "700",
};

export const fontFamilies = {
  font1: "Montserrat",
  font2: "Nunito",
  font3: "Poppins",
};

export const spacings = {
  xsmall: "4px",
  small: "8px",
  medium: "16px",
  large: "24px",
  xlarge: "48px",
};

export const boxSizes = {
  xsmall: "25px",
  small: "50px",
  medium: "100px",
  large: "150px",
  xlarge: "200px",
}

export const AuthBackground = styled.div`
  background: url(${authImage});
  min-width: fit-content;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
