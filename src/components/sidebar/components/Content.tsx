// chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { PropsWithChildren } from "react";
import { IRoute, SidebarRoute, sidebarRoutes } from "@/common/constants/routes";
import { useNavigate } from "react-router-dom";
import CurrentUserAvatar from "./CurrentUserAvatar";

interface SidebarContent extends PropsWithChildren {
  routes: IRoute[];
}

function SidebarContent(props: SidebarContent) {
  const { routes } = props;
  const textColor = useColorModeValue("navy.700", "white");
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      {/* <Brand /> */}
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          {/* <Links routes={routes} /> */}
          <SideBarLinks routes={routes} />
        </Box>
      </Stack>

      <Box
        /*         ps="20px"
        pe={{ md: "16px", "2xl": "0px" }}
        borderRadius="30px" */
        mt="60px"
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        {/* <SidebarCard /> */}
      </Box>
      <CurrentUserAvatar />
    </Flex>
  );
}

export default SidebarContent;

type SidebarLinkProps = {
  routes: SidebarRoute[];
};

const SideBarLinks = (props: SidebarLinkProps) => {
  const { routes } = props;
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  let activeIcon = useColorModeValue("brand.500", "white");
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600",
  );
  const navigate = useNavigate();
  return (
    <>
      {routes.map((route, key) => {
        return (
          <HStack
            mb="6px"
            spacing={activeRoute(route.path.toLowerCase()) ? "22px" : "26px"}
          >
            <Button
              onClick={() => {
                navigate(route.path);
              }}
            >
              <Flex w="100%" alignItems="center" justifyContent="center">
                <Box
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeIcon
                      : inactiveColor
                  }
                  me="12px"
                  mt="6px"
                >
                  {route.icon}
                </Box>
                <Text
                  me="auto"
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : "secondaryGray.600"
                  }
                  fontWeight="500"
                  fontSize="md"
                >
                  {route.name}
                </Text>
              </Flex>
            </Button>
          </HStack>
        );
      })}
    </>
  );
};
