"use client"
import React from 'react';
import {usePathname} from "@/i18n/navigation";
import MyVehicles from "@/components/shared/MyVehicles";

type AdminAsideComponentsProps = {
    props: any
}

const AdminAsideComponents = ({
                                  ...props
                              }: AdminAsideComponentsProps) => {


    return (
        <div>
            <h1>AdminAsideComponents</h1>
        </div>
    );
};

export default AdminAsideComponents;
