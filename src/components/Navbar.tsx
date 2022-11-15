import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UniLifeLogo from "./icons/UniLifeLogo";

type Props = {};

const NavbarWrapper = styled.div`
  padding: 1.2em 0.8em;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(169, 169, 169, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 22px;
`;
const linkStyle = {
  textDecoration: "none",
  color: "#3D3D3D",
};
const linkStyleLogin = {
  textDecoration: "none",
  color: "#3D3D3D",
  border: "2.5px solid #7CF2B8",
  borderRadius: "10px",
  padding: "16px 46px",
};

export default function Navbar({}: Props) {
  // const location = useLocation();

  /*   console.log('hash', location.hash);
  console.log('pathname', location.pathname);
  console.log('search', location.search); */

  // if (location.pathname === "/auth/register") {
  //   return null;
  // }
  // if (location.pathname === "/auth/login") {
  //   return null;
  // }

  const { t } = useTranslation();
  return (
    <NavbarWrapper>
      <Link style={linkStyle} to="/">
        <UniLifeLogo />
      </Link>
      <Link style={linkStyle} to="/">
        {t("navbar.home")}
      </Link>
      <Link style={linkStyle} to="/contact">
        {t("navbar.contact")}
      </Link>
      <Link style={linkStyle} to="/campaigns">
        {t("navbar.campaigns")}
      </Link>
      <Link style={linkStyleLogin} to="/auth/login">
        {t("navbar.login")}
      </Link>
      <Link style={linkStyle} to="/auth/register">
        {t("navbar.register")}
      </Link>
    </NavbarWrapper>
  );
}
