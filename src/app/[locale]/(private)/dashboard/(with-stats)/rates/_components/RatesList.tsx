"use client";
import React from 'react';
import {useUserRatings} from "@/hooks/useRatings";

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
                    <div key={index} className="flex justify-between">
                        <p>{rating.comment}</p>
                        <p>{rating.rating}</p>
                        <p>{rating.author.name}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default RatesList;
