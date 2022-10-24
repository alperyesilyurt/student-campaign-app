import styled from "styled-components";
import authImage from "../../assets/vectors/auth-background.svg";

export const borderRadiusSizes = {
  xsmall: "4px",
  small: "6px",
  medium: "10px",
  large: "24px",
  xlarge: "48px",
};

export const AuthBackground = styled.div`
  background: url(${authImage});
  min-width: fit-content;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
