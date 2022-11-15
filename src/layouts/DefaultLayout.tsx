import Footer from "@/components/Footer";
import React, { Fragment } from "react";
import Navbar from "@/components/Navbar";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Fragment>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </Fragment>
  );
};
