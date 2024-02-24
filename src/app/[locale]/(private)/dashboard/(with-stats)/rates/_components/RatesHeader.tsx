"use client"
import React from 'react';
import {useUserRatings} from "@/hooks/useRatings";
import {Star} from "lucide-react";

type RatesHeaderProps = {
    userId: string
}

const RatesHeader = ({userId}: RatesHeaderProps) => {
    const {data, isLoading, error} = useUserRatings(userId)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    console.log(data)

    return (
        <div className="w-full flex justify-between items-center fira-go bg-default-100 px-4 py-2 rounded-xl">
            <div className="flex justify-center items-center gap-2">
                <small>სულ შეფასება</small>
                <strong className="text-xl">{data?.ratingCount}</strong>
            </div>
            <div className="flex justify-center items-center gap-2">
                <Star/>
                <strong className="text-xl">{data?.ratingAvg}</strong>
            </div>
        </div>
    );
};

export default RatesHeader;
