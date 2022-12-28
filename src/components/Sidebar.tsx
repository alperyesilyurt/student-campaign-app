import {
  Drawer,
  Box,
  useColorModeValue,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  Flex,
  Link,
} from "@chakra-ui/react";
import UniLifeLogo from "./icons/UniLifeLogo";
import { useTranslation } from "react-i18next";

export const Sidebar = (props: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useTranslation();

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      pos="absolute"
    >
      <Drawer
        autoFocus={false}
        isOpen={props.isOpen}
        placement="right"
        onClose={props.onClose}
        returnFocusOnClose={false}
        onOverlayClick={props.onClose}
        size="xs"
      >
        <DrawerOverlay></DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>
            <UniLifeLogo height="70px" />
          </DrawerHeader>
          <Link
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
            href="/"
          >
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "teal.200",
                color: "white",
              }}
            >
              {t("navbar.home")}
            </Flex>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
            href="/contact"
          >
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "teal.200",
                color: "white",
              }}
            >
              {t("navbar.contact")}
            </Flex>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
            href="/campaigns"
          >
            <Flex
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "teal.200",
                color: "white",
              }}
            >
              {t("navbar.campaigns")}
            </Flex>
          </Link>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
