import React from 'react';
import MyVehicles from "@/components/shared/MyVehicles";
import {getCarByOwnerId, getCars} from "@/lib/actions/cars";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import AdminAsideComponents from "@/components/administration/AdminAsideComponents";

const AdminAside = async () => {
    const session = await auth();
    const user = session?.user;
    const {cars} = await getCarByOwnerId(user?.id as string)

    return (
        <aside
            className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-4 xl:block">

            <AdminAsideComponents cars={cars}/>

        </aside>
    );
};

export default AdminAside;
