import React from "react";
import styled from "styled-components";
import UniLifeLogo_2 from "./icons/UniLifeLogo_2";
import Button from "./styled/button/Button";

type Props = {};

const FooterWrapper = styled.div`
  background: #000000;
  width: 100%;
  height: 40vh;
  position: "relative";
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export default function Footer({}: Props) {
  return (
    <FooterWrapper>
      <Wrapper>
        <UniLifeLogo_2 />
        <Button variant="link" size="small">
          Make your university life a lot cheaper and funnier
        </Button>
      </Wrapper>
      <Wrapper>
        <Button variant="link" size="small">
          Popular Categories
        </Button>
        <Button variant="link" size="small">
          Food
        </Button>
        <Button variant="link" size="small">
          Fashion
        </Button>
        <Button variant="link" size="small">
          Tech
        </Button>
        <Button variant="link" size="small">
          Health
        </Button>
        <Button variant="link" size="small">
          Sports
        </Button>
        <Button variant="link" size="small">
          All
        </Button>
      </Wrapper>
      <Wrapper>
        <Button variant="link" size="small">
          Corporate
        </Button>
        <Button variant="link" size="small">
          About UniLife
        </Button>
        <Button variant="link" size="small">
          Contact
        </Button>
        <Button variant="link" size="small">
          Terms of Service
        </Button>
        <Button variant="link" size="small">
          Cookie Policy
        </Button>
        <Button variant="link" size="small">
          Privacy Policy
        </Button>
      </Wrapper>
      <Wrapper>
        <Button variant="link" size="small">
          Follow us
        </Button>
      </Wrapper>
    </FooterWrapper>
  );
}
