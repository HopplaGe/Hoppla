"use client";
import React from 'react';
import {useUrgentInfo} from "@/hooks/notifications/useUrgentInfo";

const TopInfoBanner = () => {

    const {data: info, isLoading, error} = useUrgentInfo()

    if (isLoading) return <div
        className="max-w-6xl fira-go page-wrapper py-2 text-center rounded-b-2xl bg-default-100 text-default-600">Loading...</div>
    if (error) return <div>Error</div>

    return (
        <>
            <div
                className="max-w-6xl text-white fira-go page-wrapper py-2 text-center rounded-b-2xl"
                style={{backgroundColor: info && info[0].color as string}}
            >
                <div className="">
                    {info && info[0]?.content as string}
                </div>
            </div>
        </>
    );
};

export default TopInfoBanner;
