"use client"
import React from 'react';
import {useTranslations} from "next-intl";
import {useDailyRides} from "@/hooks/rides/useRides";
import moment from "moment/moment";
import Link from "next/link";

const DailyRideLinks = () => {
    const t = useTranslations("Footer");

    const {data: rides, isLoading, error} = useDailyRides();

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <h3 className="text-lg font-semibold leading-6 text-gray-900 fira-go">
                {t("RidesOfTheDay")}
            </h3>
            <ul role="list" className="mt-6 space-y-4">
                {rides?.map((ride, index) => (
                    <li key={index}>
                        <Link
                            href={`/rides/${ride.id}`}
                            className="text-sm leading-6 text-gray-600 hover:text-gray-900 fira-go"
                        >
                            {ride.from.split(",")[1]} - {ride.to.split(",")[1]}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DailyRideLinks;
