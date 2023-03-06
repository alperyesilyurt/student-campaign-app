import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import UniLifeLogo from "./icons/UniLifeLogo";
import { useMediaQuery, useDisclosure, Icon } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "@chakra-ui/react";

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

export default function Navbar({}: Props) {
  const location = useLocation();
  const disclosure = useDisclosure();

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const { t } = useTranslation();
  return (
    <NavbarWrapper className={isLargerThan768 ? "" : "mobile"}>
      <Link to="/">
        <UniLifeLogo height="70px" />
      </Link>
      {isLargerThan768 && (
        <Menu>
          <Link to="/">
            <Button variant="ghost">{t("navbar.home")}</Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost">{t("navbar.contact")}</Button>
          </Link>
          <Link to="/campaigns">
            <Button variant="ghost">{t("navbar.campaigns")}</Button>
          </Link>
        </Menu>
      )}
      {isLargerThan768 && (
        <Actions>
          <Link to="/auth/login">
            <Button variant="outline" size="lg" borderColor="green">
              {t("navbar.login")}
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="ghost">{t("navbar.register")}</Button>
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
