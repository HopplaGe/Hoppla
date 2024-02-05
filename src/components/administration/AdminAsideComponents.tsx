"use client"
import React from 'react';
import {usePathname} from "@/i18n/navigation";
import MyVehicles from "@/components/shared/MyVehicles";

type AdminAsideComponentsProps = {
    cars: any
}

const AdminAsideComponents = ({
                                  cars
                              }: AdminAsideComponentsProps) => {

    const pathName = usePathname()

    if (pathName !== '/manage') {
        return (
            <aside
                className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-4 xl:block">
                <MyVehicles cars={cars}/>
            </aside>
        )
    }

    return (
        <div>
            <h1>AdminAsideComponents</h1>
        </div>
    );
};

export default AdminAsideComponents;
