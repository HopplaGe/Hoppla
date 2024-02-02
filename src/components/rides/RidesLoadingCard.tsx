import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

const RideCard = () => {

    return (
        <Skeleton
            className="relative bg-gray-100 border border-gray-100 w-full rounded-md flex flex-col overflow-hidden group mb-6">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row space-x-6 p-4">
                    <div className="flex flex-col justify-between space-y-4">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-12 h-4"/>
                            <small className="text-gray-400 text-sm lg:text-lg">
                                <Skeleton className="w-8 h-4"/>
                            </small>
                        </div>
                        <div className="text-lg lg:text-2xl font-semibold fira-go">
                            <Skeleton className="w-12 h-4"/>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4"/>
                            <h3 className="text-md lg:text-xl font-bold fira-go">
                                <Skeleton className="w-32 h-4"/>
                            </h3>
                        </div>

                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4"/>
                            <h3 className="text-md lg:text-xl font-bold fira-go">
                                <Skeleton className="w-32 h-4"/>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <Skeleton className="w-16 h-10"/>
                </div>
            </div>
            <div className="flex flex-row justify-between bg-gray-200 border-t border-gray-100 p-4 items-center z-10">
                <div className="flex flex-row space-x-4">
                    <div className="">
                        <Skeleton className="w-14 h-14"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div
                            className="text-sm lg:text-lg font-semibold text-gray-600 fira-go">
                            <Skeleton className="w-32 h-4"/>
                        </div>
                        <div className="text-[10px] lg:text-xs text-gray-400">
                            <Skeleton className="w-16 h-4"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <Skeleton className="w-4 h-4"/>
                    <Skeleton className="w-4 h-4"/>
                    <Skeleton className="w-4 h-4"/>
                    <Skeleton className="w-4 h-4"/>
                </div>
            </div>
        </Skeleton>
    );
};

export default RideCard;
