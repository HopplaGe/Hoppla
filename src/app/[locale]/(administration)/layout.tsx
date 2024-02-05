import React from 'react';
import {LayoutProps} from "@/types/layoutProps";
import AdminSidebar from "@/components/administration/AdminSidebar";
import AdminNavbar from "@/components/administration/AdminNavbar";
import AdminAside from "@/components/administration/AdminAside";

const AdminLayout = ({children}: LayoutProps) => {
    return (
        <>
            <AdminSidebar/>
            <div className="lg:pl-20">
                <AdminNavbar/>
                <main className="xl:pl-96">
                    {children}
                </main>
            </div>
            <AdminAside/>
        </>
    );
};

export default AdminLayout;
