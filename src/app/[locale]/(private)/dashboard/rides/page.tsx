import RideCard from '@/components/rides/RideCard';
import { getRidesByDriver } from '@/lib/actions/rides';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Ride } from '@prisma/client';
import React, { Suspense } from 'react';

const DashRides = async () => {

    const session = await auth()

    const user = session?.user;

    const myrides = await getRidesByDriver(user?.id!);

    return (
        <div>
            <ul className={cn("w-full grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto list-none z-10")}>
                <Suspense fallback={<div>Loading...</div>}>
                rides
                </Suspense>
            </ul>
        </div>
    );
};

export default DashRides;