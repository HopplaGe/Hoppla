import React from "react";
import {LayoutProps} from "@/types/layoutProps";
import NavBar from "@/components/partials/NavBar";
import Footer from "@/components/partials/Footer";
import TopInfoBanner from "@/components/shared/TopInfoBanner";
import {getUrgentInfo} from "@/lib/actions/infos";

const PublicLayout = ({children}: LayoutProps) => {
    return (
        <>
            <NavBar/>
            <TopInfoBanner/>
            {children}
            <Footer/>
        </>
    );
};

export default PublicLayout;
