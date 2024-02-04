"use client"
import React from 'react';
import {useSession} from "next-auth/react";
import MyVehicles from "@/components/shared/MyVehicles";

const AdminAside = () => {

    const session = useSession()
    const user = session?.data

    const userRole = "USER"

    return (
        <aside
            className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-4 xl:block">
            <h2 className="font-bold text-xl mb-4">MyVehicles</h2>
            <MyVehicles cars={[]}/>

        </aside>
    );
};

export default AdminAside;
