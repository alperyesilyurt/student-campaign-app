import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import UniLifeLogo from "./icons/UniLifeLogo";
import {
  useMediaQuery,
  useDisclosure,
  Icon,
  Center,
  Button,
} from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppSelector } from "@/store/hooks";
import { shallowEqual } from "react-redux";
import { removeTokenFromStorage } from "@/common/utils/storage";

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
  const user = useAppSelector((state) => state.auth.user, shallowEqual);
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
          <Link to="/company/login">
            <Button variant="ghost">Şirket giriş</Button>
          </Link>
        </Menu>
      )}
      {isLargerThan768 && <NavbarAuth />}

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

const NavbarAuth = () => {
  const user = useAppSelector((state) => state.auth.user, shallowEqual);
  const { t } = useTranslation();

  const logout = () => {
    removeTokenFromStorage();
    window.location.reload();
  };

  if (user) {
    return (
      <Actions>
        <Center bg={"gray.200"} w={6} h={6} p={6} rounded={"full"}>
          {user.name[0].toUpperCase() + user.surname[0].toUpperCase()}
        </Center>
        <Button onClick={logout} variant={"ghost"}>
          Logout
        </Button>
      </Actions>
    );
  }

  return (
    <Actions>
      <Link to="/auth/login">{t("navbar.login")}</Link>
      <Link to="/auth/register">{t("navbar.register")}</Link>
    </Actions>
  );
};
