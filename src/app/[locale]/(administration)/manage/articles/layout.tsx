import React from "react";
import { LayoutProps } from "@/types/layoutProps";

const PrivateLayout = ({ children }: LayoutProps) => {
  return <div className="p-5 fira-go">{children}</div>;
};

export default PrivateLayout;
