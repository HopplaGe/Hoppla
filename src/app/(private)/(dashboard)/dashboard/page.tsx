import React, {FC} from "react";
import {getServerSession} from "next-auth";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import DashboardStats from "@/components/dashboard/Stats";
import {getRideByDriverId} from "@/lib/actions/rides";
import {getUserByEmail} from "@/lib/actions/user";

import MyCars from "@/components/dashboard/MyCars";
import MyRides from "@/components/dashboard/MyRides";
import {getCarByOwner} from "@/lib/actions/cars";

interface pageProps {
}

const page: FC<pageProps> = async () => {


    const session = await getServerSession()

    if (!session) return null

    const currentUser = await getUserByEmail(session?.user?.email as string)

    if (!currentUser) return null
    const rides = await getRideByDriverId(currentUser.id) || []

    const cars = await getCarByOwner(currentUser.id) || []

    return (
        <div className="page-wrapper pt-8 lg:flex lg:gap-x-2 lg:px-8 fira-go">
            <SidebarMenu/>
            <main className="px-4 sm:px-6 lg:flex-auto lg:px-0 space-y-8">

                <DashboardStats userId={currentUser.id}/>

                <MyCars cars={cars}/>

                <MyRides rides={rides}/>

            </main>
        </div>
    );
};

export default page;