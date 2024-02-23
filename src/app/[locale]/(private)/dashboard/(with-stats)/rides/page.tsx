import StatBlock from "@/components/dashboard/stats/StatBlock";
import StatCard from "@/components/dashboard/stats/StatCard";
import RideCard from "@/components/rides/RideCard";
import { getRidesByDriver } from "@/lib/actions/rides";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import Ride from "./_components/Ride";
import RidesTable from "./_components/RidesTable";

const DashRides = async () => {
    const session = await auth();

    const user = session?.user;

    const myrides = await getRidesByDriver(user?.id!);

    return (
        <div>
            <ul
                className={cn(
                    "w-full grid grid-cols-1 gap-4 h-auto list-none z-10"
                )}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    {/* {myrides?.rides.map((ride: any) => (
                        <li key={ride.id} className="w-full">
                            <Ride ride={ride} />
                        </li>
                    ))} */}
                    {myrides && <RidesTable rides={myrides.rides} />}
                </Suspense>
            </ul>
        </div>
    );
};

export default DashRides;
