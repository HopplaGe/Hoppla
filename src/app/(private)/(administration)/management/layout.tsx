import React, {ReactNode} from 'react';
import AdminStatsBlock from "@/components/administration/AdminStatsBlock";
import AdminSidebarMenu from "@/components/administration/SidebarMenu";

const AdminLayout = ({children}: { children: ReactNode }) => {
    return (
        <main className="page-wrapper pt-16">
            <div className="py-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <AdminStatsBlock/>
                    <AdminSidebarMenu/>
                    <div className="col-span-3">{children}</div>
                </div>
            </div>
        </main>
    );
};

export default AdminLayout;
