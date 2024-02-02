import React from 'react';
import {Skeleton} from "@nextui-org/react";

const RideLoading = () => {
    return (
        <div className="page-wrapper py-8 flex flex-col items-center gap-4">

            <Skeleton className="w-1/4 h-10 rounded-xl"/>
            <Skeleton className="w-1/2 h-14 rounded-xl"/>

            <Skeleton className="w-full h-72 rounded-xl"/>

            <Skeleton className="w-full h-16 rounded-xl"/>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between w-full py-2 rounded-xl mt-4">
                <div className="flex flex-col items-start space-y-6">
                    <div className="flex flex-row gap-2 w-full">
                        <Skeleton className="w-28 h-28  rounded-xl"/>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-64 h-6 rounded-xl"/>
                            <Skeleton className="w-48 h-5 rounded-xl"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-64 h-6 rounded-xl"/>
                        <Skeleton className="w-48 h-5 rounded-xl"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-64 h-6 rounded-xl"/>
                        <Skeleton className="w-48 h-5 rounded-xl"/>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <Skeleton className="w-28 h-12 rounded-xl"/>
                    <Skeleton className="w-72 h-16 rounded-xl"/>
                </div>
            </div>
        </div>
    );
};

export default RideLoading;
