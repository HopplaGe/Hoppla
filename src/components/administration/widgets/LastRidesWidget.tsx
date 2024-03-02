"use client";
import React from "react";
import moment from "moment";
import "moment/locale/ka";
import {useLastRides} from "@/hooks/rides/useRides";
import {MapPin} from "lucide-react";

const LastUsersWidget = () => {
    const { data: rides, isLoading, isError } = useLastRides(5);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return (
        <ul className={"flex flex-col space-y-4"}>
            {(rides as any[])?.map((ride) => (
                <li
                    key={ride.id}
                    className="flex flex-row justify-between items-center fira-go bg-default-100 px-4 py-2 rounded-xl"
                >
                    <div className={"flex flex-row gap-2"}>
                        <div className={"flex flex-col gap-2"}>
                            <small className={"text-xs flex flex-row gap-1"}>
                                <MapPin size={16} className={"text-primary"}/>
                                {ride.from}
                            </small>
                            <small className={"text-xs flex flex-row gap-1"}>
                                <MapPin size={16} className={"text-primary"}/>
                                {ride.to}
                            </small>
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <small className={"text-xs"}>
                            {moment(ride.createdAt).locale("ka").fromNow()}
                        </small>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default LastUsersWidget;
