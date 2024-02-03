import React from "react";
import { LayoutProps } from "@/types/layoutProps";
import NavBar from "@/components/partials/NavBar";

const PublicLayout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* <NavBar/> */}
      {children}
    </>
  );
};

export default PublicLayout;
