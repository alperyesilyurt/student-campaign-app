import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UniLifeLogo from "./icons/UniLifeLogo";
import { useMediaQuery, useDisclosure, Icon } from "@chakra-ui/react";
import Button from "./styled/button/Button";
import { Sidebar } from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

type Props = {};

const NavbarWrapper = styled.div`
  padding: 0.8em 0.8em;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(169, 169, 169, 0.1);
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  position: sticky;
  top: 0;
  z-index: 10;
  &.mobile {
    padding: 0.8em 2.8em;
    justify-content: space-between;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 2.5em;
`;

const Actions = styled.div`
  display: flex;
  gap: 2.5em;
  align-items: center;
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
  const location = useLocation();
  const disclosure = useDisclosure();

  if (location.pathname === "/auth/register") {
    return null;
  }
  if (location.pathname === "/auth/login") {
    return null;
  }

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { t } = useTranslation();
  return (
    <NavbarWrapper className={isLargerThan768 ? "" : "mobile"}>
      <Link style={linkStyle} to="/">
        <UniLifeLogo height="70px" />
      </Link>
      {isLargerThan768 && (
        <Menu>
          <Link style={linkStyle} to="/">
            {t("navbar.home")}
          </Link>
          <Link style={linkStyle} to="/contact">
            {t("navbar.contact")}
          </Link>
          <Link style={linkStyle} to="/campaigns">
            {t("navbar.campaigns")}
          </Link>
        </Menu>
      )}
      {isLargerThan768 && (
        <Actions>
          <Link style={linkStyleLogin} to="/auth/login">
            {t("navbar.login")}
          </Link>
          <Link style={linkStyle} to="/auth/register">
            {t("navbar.register")}
          </Link>
        </Actions>
      )}
      {!isLargerThan768 && (
        <Actions>
          <Icon
            as={GiHamburgerMenu}
            aria-label="menu"
            height="20px"
            width="20px"
            cursor="pointer"
            onClick={disclosure.onOpen}
          />
        </Actions>
      )}
      <Sidebar isOpen={disclosure.isOpen} onClose={disclosure.onClose} />
    </NavbarWrapper>
  );
}
