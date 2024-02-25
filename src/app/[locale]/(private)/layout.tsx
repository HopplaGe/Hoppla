import React from "react";
import {LayoutProps} from "@/types/layoutProps";
import NavBar from "@/components/partials/NavBar";
import Footer from "@/components/partials/Footer";
import DashSidebar from "@/components/dashboard/DashSidebar";
import MobileUserMenu from "@/components/partials/MobileUserMenu";

const PrivateLayout = ({children}: LayoutProps) => {
    return (
        <>
            <NavBar/>
            <main className="page-wrapper py-6 grid md:grid-cols-3 lg:grid-cols-4 gap-6 justify-between items-start">
                <DashSidebar/>
                <div className="col-span-3">
                    {children}
                </div>
            </main>
            <Footer/>
            <MobileUserMenu/>
        </>
    );
};

export default PrivateLayout;
