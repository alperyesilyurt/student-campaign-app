import React, { forwardRef, HTMLInputTypeAttribute, memo } from "react";
import styled from "styled-components";
import { borderRadiusSizes, spacings } from "../constants";
import * as colors from "../colors";

const StyledInputWrapper = styled.input`
  padding: ${spacings.medium} ${spacings.medium};
  border: 1px solid ${colors.gray1};
  border-radius: ${borderRadiusSizes.medium};
`;

type Props = {
  type?: string;
  placeholder?: string;
  value?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(({ ...otherProps }, ref) => {
  return <StyledInputWrapper {...otherProps} ref={ref}></StyledInputWrapper>;
});
export default memo(Input);
