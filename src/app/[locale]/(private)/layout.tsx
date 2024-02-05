import React from "react";
import {LayoutProps} from "@/types/layoutProps";
import NavBar from "@/components/partials/NavBar";
import Footer from "@/components/partials/Footer";
import DashSidebar from "@/components/dashboard/DashSidebar";

const PrivateLayout = ({children}: LayoutProps) => {
    return (
        <>
            <NavBar/>
            <main className="page-wrapper py-6 grid grid-cols-4 gap-6 justify-between items-start">
                <DashSidebar/>
                <div className="col-span-3">
                    {children}
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default PrivateLayout;
