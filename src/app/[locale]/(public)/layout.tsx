import React from "react";
import {LayoutProps} from "@/types/layoutProps";
import NavBar from "@/components/partials/NavBar";
import Footer from "@/components/partials/Footer";
import TopInfoBanner from "@/components/shared/TopInfoBanner";
import {getUrgentInfo} from "@/lib/actions/infos";
import {UrgentInfo} from "@prisma/client";

const PublicLayout = async ({children}: LayoutProps) => {

    const info = await getUrgentInfo();

    return (
        <>
            <NavBar/>
            {info && <TopInfoBanner info={info as UrgentInfo}/>}
            {children}
            <Footer/>
        </>
    );
};

export default PublicLayout;
