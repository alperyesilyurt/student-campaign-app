import React from "react";

import styled from "styled-components";

import * as colors from "../colors";
import { borderRadiusSizes } from "../constants";

/* export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Link = 'link',
} */
export type ButtonType = "primary" | "secondary" | "link" | "black";

const StyledButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1em;
  font-weight: 500;
  white-space: nowrap;

  cursor: pointer;
  border-radius: ${borderRadiusSizes.medium};
  transition: all 0.2s ease-in-out;

  &.primary {
    color: ${colors.black};
    background: ${colors.primaryGreen};
    border: none;
  }
  &.primary.outlined {
    border: none;
    border: 2.5px solid ${colors.primaryGreen};
    background: ${colors.transparent};
  }
  &.secondary {
    color: ${colors.black};
    background-color: ${colors.primaryBlue};
    border: none;
  }
  &.link {
    color: ${colors.primaryBlue};
    background-color: transparent;
    border: none;
    font-weight: 400;
  }
  &.black {
    color: ${colors.white};
    background-color: black;
    border: none;
    font-weight: 400;
  }

  &.disabled {
    color: #ddd;
    background-color: #aaa;
    border: 1px solid #aaa;
  }

  &.default {
    padding: 0.6em 1.2em;
  }

  &.large {
    padding: 16px 96px;
  }

  &:hover {
    filter: brightness(1.05);
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

export interface ButtonProps {
  className?: string;
  children?: string | React.ReactNode;
  onClick?: () => void;
  type: ButtonType;
  outlined?: boolean;
  size: "large" | "medium" | "small" | "default";
}

const Button = (props: ButtonProps) => {
  const {
    onClick,
    children,
    type,
    className,
    outlined = false,
    size = "default",
  } = props;

  return (
    <StyledButtonWrapper
      className={`${type} ${className} ${outlined ? "outlined" : ""} ${size}`}
      onClick={onClick}
    >
      {children}
    </StyledButtonWrapper>
  );
};

export default Button;
