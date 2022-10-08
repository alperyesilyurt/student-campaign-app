import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {};

const NavbarWrapper = styled.div`
  padding: 1em 0.6em;
  background: #0000001c;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  gap: 15px;
`;

export default function Navbar({}: Props) {
  const { t } = useTranslation();
  return (
    <NavbarWrapper>
      <Link to="/">{t("navbar.home")}</Link>
      <Link to="/companies">{t("navbar.companies")}</Link>
      <Link to="/campaigns">{t("navbar.campaigns")}</Link>
      <Link to="/auth">{t("navbar.auth")}</Link>
    </NavbarWrapper>
  );
}
