import {getRidesByDriver} from "@/lib/actions/rides/get";
import {auth} from "@/lib/auth";
import {cn} from "@/lib/utils";
import React, {Suspense} from "react";
import RidesTable from "./_components/RidesTable";

const DashRides = async () => {
    const session = await auth();

    const user = session?.user;

    const myRides = await getRidesByDriver(user?.id!);

    return (
        <div>
            <ul
                className={cn(
                    "w-full grid grid-cols-1 gap-4 h-auto list-none z-10"
                )}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    {myRides && <RidesTable rides={myRides}/>}
                </Suspense>
            </ul>
        </div>
    );
};

export default DashRides;
