import React from 'react';
import {Skeleton} from "@nextui-org/react";

const Loading = () => {
    return (
        <div className="page-wrapper py-8 flex flex-col items-center gap-4">

            <Skeleton className="w-full h-16 rounded-xl"/>

            <div className="grid grid-cols-1 lg:grid-cols-3 justify-between w-full py-2 rounded-xl mt-4">
                <div className="lg:col-span-2 flex flex-col items-start space-y-6">
                    <Skeleton className="w-full h-16 rounded-xl"/>
                    <div className="flex flex-col gap-2 w-full">
                        <Skeleton className="w-64 h-8  rounded-xl"/>
                        <Skeleton className="w-24 h-4  rounded-xl"/>
                        <Skeleton className="w-16 h-3  rounded-xl"/>
                        <div className="grid lg:grid-cols-2 gap-4 w-full">
                            <Skeleton className="w-full h-64 rounded-xl"/>
                            <Skeleton className="w-full h-64 rounded-xl"/>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 flex flex-col gap-2 items-end">
                    <Skeleton className="w-28 h-8 rounded-xl"/>
                    <Skeleton className="w-80 h-20 rounded-xl"/>
                    <Skeleton className="w-80 h-20 rounded-xl"/>
                    <Skeleton className="w-80 h-20 rounded-xl"/>
                </div>
            </div>
        </div>
    );
};

export default Loading;
