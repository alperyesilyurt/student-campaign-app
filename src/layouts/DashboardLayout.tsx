import Footer from "@/components/Footer";
import React, { Fragment, useState } from "react";
import { Box, Portal } from "@chakra-ui/react";
import DashboardSidebar from "@/components/sidebar/DashboardSidebar";
import { SidebarContext } from "@/common/contexts/SidebarContext";
import routes from "@/common/constants/routes";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DefaultLayoutProps) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <DashboardSidebar routes={routes} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              {children}
            </Box>
          </Portal>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
};
