import React from 'react';
import {auth} from "@/lib/auth";
import RatesHeader from "@/app/[locale]/(private)/dashboard/(with-stats)/rates/_components/RatesHeader";
import RatesList from "@/app/[locale]/(private)/dashboard/(with-stats)/rates/_components/RatesList";

const DashRides = async () => {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="w-full flex flex-col justify-start items-center gap-4">
            <RatesHeader userId={user?.id!}/>
            <RatesList userId={user?.id!}/>
        </div>
    );
};

export default DashRides;
