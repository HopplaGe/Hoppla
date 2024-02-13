"use client"
import React from 'react';
import {Tab, Tabs} from "@nextui-org/react";
import {useTranslations} from "next-intl";

const transportType = [
    {key: "all", title: "ALL"},
    {key: "carpool", title: "CAR"},
    {key: "minivan", title: "MINIVAN"},
    {key: "bus", title: "BUS"}
]

const CarTypesTab = ({transport_type}: { transport_type: string }) => {
    const t = useTranslations("Rides");
    return (
        <div className="w-full flex flex-col lg:flex-row justify-center mb-4 fira-go">
            <Tabs
                radius="lg"
                aria-label="Transport Type"
                size="lg"
                color="secondary"
                items={transportType}
                selectedKey={transport_type ? transport_type : "all"}
                fullWidth
            >
                {(tab) => (
                    <Tab key={tab.key} value={tab.key} title={t(`TransportTypes.${tab.title}`)}/>
                )}
            </Tabs>
        </div>
    );
};

export default CarTypesTab;
