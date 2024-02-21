import React from "react";
import {LayoutProps} from "@/types/layoutProps";
import NavBar from "@/components/partials/NavBar";
import Footer from "@/components/partials/Footer";
import TopInfoBanner from "@/components/shared/TopInfoBanner";
import {getUrgentInfo} from "@/lib/actions/infos";

const PublicLayout = async ({children}: LayoutProps) => {

    // TODO: Fix this "წარმოებაში გამოაქვს შეცდომა"
    // const info = await getUrgentInfo();
    //
    // console.log(info);

    return (
        <>
            <NavBar/>
            {/*{info && <TopInfoBanner info={info[0]}/>}*/}
            {children}
            <Footer/>
        </>
    );
};

export default PublicLayout;
