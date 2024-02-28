"use client"
import React from 'react';
import {Button} from "@nextui-org/react";

const CompanyActions = () => {
    return (
        <div className="flex flex-col md:flex-row xl:flex-col gap-2 fira-go">
            <Button
                className="w-full"
                color="default"
                size="sm"
                variant="solid"
                onClick={() => {
                }}
            >
                კომპანიის შექმნა
            </Button>
            <Button
                className="w-full"
                color="default"
                size="sm"
                variant="solid"
                onClick={() => {
                }}
            >
                ავტომობილის დამატება
            </Button>
            <Button
                className="w-full"
                color="default"
                size="sm"
                variant="solid"
                onClick={() => {
                }}
            >
                მძღოლის დამატება
            </Button>
            <Button
                className="w-full"
                color="default"
                size="sm"
                variant="solid"
                onClick={() => {
                }}
            >
                განრიგის დამატება
            </Button>
        </div>
    );
};

export default CompanyActions;
