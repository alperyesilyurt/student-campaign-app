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
export interface ButtonProps {
  className?: string;
  children?: string | React.ReactNode;
  onClick?: () => void;
  variant: ButtonType;
  type?: "button" | "submit" | "reset" | undefined;
  fontWeight?: string;
  boxSize?: string;
  size?: "large" | "medium" | "small" | "default";
}

const Button = (props: ButtonProps) => {
  const {
    onClick,
    children,
    variant,
    className,
    outlined = false,
    fontWeight,
    boxSize,
    type,
    size = "default",
  } = props;

  const StyledButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.6em 1.2em;
    font-weight: ${fontWeight};
    width: ${boxSize};
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
    &.default {
      padding: 0.6em 1.2em;
    }

    &.large {
      padding: 16px 96px;
    }

    &.disabled {
      color: #ddd;
      background-color: #aaa;
      border: 1px solid #aaa;
    }

    &:hover {
      filter: brightness(1.05);
    }

    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  `;

  return (
    <StyledButtonWrapper
      className={`${variant} ${className} ${
        outlined ? "outlined" : ""
      } ${size}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </StyledButtonWrapper>
  );
};

export default Button;
