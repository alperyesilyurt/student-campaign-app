import { IRoute } from "@/common/constants/routes";
import { Box, useColorModeValue } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { renderTrack, renderThumb, renderView } from "./ScrollBar";
import Content from "./components/Content";

interface SidebarProps extends PropsWithChildren {
  routes: IRoute[];
}

function DashboardSidebar(props: SidebarProps) {
  const { routes } = props;

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset",
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarRadius = "30px";
  let sidebarMargins = "0px";

  return (
    <Box display={{ sm: "none", xl: "block" }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w="285px"
        ms={{
          sm: "16px",
        }}
        my={{
          sm: "16px",
        }}
        h="calc(100vh - 32px)"
        m={sidebarMargins}
        borderRadius={sidebarRadius}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  );
}

export default DashboardSidebar;
