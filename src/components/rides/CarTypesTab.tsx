"use client"
import React from 'react';
import {Tabs, Tab, Chip} from "@nextui-org/react"
import {Bus, BusFront, Car} from "lucide-react";

const CarTypesTab = ({ridesCount}: { ridesCount: number }) => {
    return (
        <div className="w-full flex flex-col lg:flex-row justify-center mb-4">
            <Tabs key="carpool" className="fira-go" size="lg" radius="lg" color="primary">
                <Tab key="all" title={
                    <div className="flex items-center space-x-2">
                        <span>ყველა</span>
                        <Chip size="sm" variant="flat" radius="sm"
                              className="bg-background text-primary">{ridesCount}</Chip>
                    </div>
                }/>
                <Tab key="carpool" title={
                    <div className="flex items-center space-x-2">
                        <Car/>
                        <span>მსუბუქი ავტომობილები</span>
                        <Chip size="sm" variant="flat" radius="sm"
                              className="bg-background text-primary">{ridesCount}</Chip>
                    </div>
                }/>
                <Tab key="minibus" title={
                    <div className="flex items-center space-x-2">
                        <Bus/>
                        <span>მინიბუსი</span>
                        <Chip size="sm" variant="flat" radius="sm"
                              className="bg-background text-primary">{ridesCount}</Chip>
                    </div>
                }/>
                <Tab key="bus" title={
                    <div className="flex items-center space-x-2">
                        <BusFront/>
                        <span>ავტობუსი</span>
                        <Chip size="sm" variant="flat" radius="sm"
                              className="bg-background text-primary">{ridesCount}</Chip>
                    </div>
                }/>
            </Tabs>
        </div>
    );
};

export default CarTypesTab;
