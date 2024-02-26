"use client";
import React from 'react';
import {useUserRatings} from "@/hooks/useRatings";
import RatesListItem from "@/app/[locale]/(private)/dashboard/(with-stats)/rates/_components/RatesListItem";

type RatesListProps = {
    userId: string
}

const RatesList = ({userId}: RatesListProps) => {
    const {data, isLoading, error} = useUserRatings(userId)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="w-full">
            {
                data?.ratings.map((rating, index) => (
                    <RatesListItem rating={rating} key={index}/>
                ))
            }
        </div>
    );
};

export default RatesList;
