"use client"
import React from 'react';
import {Tabs, Tab} from "@nextui-org/react";
import {cn} from "@/lib/utils";
import {useTranslations} from "next-intl";

type RideListType = {
    searchParams: {
        from: string | undefined;
        to: string;
        date: string;
        seats: number;
        transport_type?: string;
        sort?: string;
        filter?: string;
    }
}

const transportType = [
    {key: "all", title: "ALL"},
    {key: "carpool", title: "CAR"},
    {key: "minivan", title: "MINIVAN"},
    {key: "bus", title: "BUS"}
]

const RidesResultList = ({searchParams}: RideListType) => {

    const t = useTranslations("Rides");

    return (
        <>
            <div className="w-full flex flex-col lg:flex-row justify-center mb-4 fira-go">
                <Tabs
                    radius="lg"
                    aria-label="Transport Type"
                    size="lg"
                    color="secondary"
                    items={transportType}
                    selectedKey={searchParams.transport_type ? searchParams.transport_type : "all"}
                    fullWidth
                >
                    {(tab) => (
                        <Tab key={tab.key} value={tab.key} title={t(`TransportTypes.${tab.title}`)}/>
                    )}
                </Tabs>
            </div>

            <h2 className="text-2xl font-bold">Results</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl hover:shadow-md">
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">{t(`RideFrom`)}: {searchParams.from}</h3>
                                <h3 className="text-lg font-bold">{t(`RideTo`)}: {searchParams.to}</h3>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{t(`RideDate`)}: {searchParams.date}</h3>
                                <h3 className="text-lg font-bold">{t(`RideSeats`)}: {searchParams.seats}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">Transport
                                    Type: {searchParams.transport_type}</h3>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Sort: {searchParams.sort}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">Filter: {searchParams.filter}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RidesResultList;
