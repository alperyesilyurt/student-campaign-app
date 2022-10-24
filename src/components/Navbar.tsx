import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import UniLifeLogo from "./icons/UniLifeLogo";

type Props = {};

const NavbarWrapper = styled.div`
  padding: 1em 0.6em;
  background: #0000001c;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
`;

export default function Navbar({ }: Props) {

  const location = useLocation();

/*   console.log('hash', location.hash);
  console.log('pathname', location.pathname);
  console.log('search', location.search); */

  if(location.pathname==="/auth/register"){
    return null;
  }
  if(location.pathname==="/auth/login"){
    return null;
  }

  const { t } = useTranslation();
  return (
    <NavbarWrapper>
      <UniLifeLogo />
      <Link to="/">{t("navbar.home")}</Link>
      <Link to="/companies">{t("navbar.companies")}</Link>
      <Link to="/campaigns">{t("navbar.campaigns")}</Link>
      <Link to="/auth/login">{t("navbar.auth.login")}</Link>
      <Link to="/auth/register">{t("navbar.auth.register")}</Link>

    </NavbarWrapper>
  );
}
