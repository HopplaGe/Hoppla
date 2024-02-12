import React from "react";
import {LayoutProps} from "@/types/layoutProps";
import NavBar from "@/components/partials/NavBar";
import Footer from "@/components/partials/Footer";
import Script from 'next/script'

const PublicLayout = ({children}: LayoutProps) => {
    return (
        <>
            <NavBar/>
            {children}
            <Footer/>
            {/*<Script*/}
            {/*    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-4LnrSUqFUTW0fR3w-WjRaDb4ISLIiQM&libraries=places"/>*/}
            {/*<Script src="https://maps.google.com/maps/api/js?sensor=false"/>*/}
        </>
    );
};

export default PublicLayout;
