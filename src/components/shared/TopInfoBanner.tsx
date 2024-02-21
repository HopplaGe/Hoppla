"use client";
import React from 'react';
import {UrgentInfo} from "@prisma/client";

type TopInfoBannerProps = {
    info: UrgentInfo;
}

const TopInfoBanner = ({info}: TopInfoBannerProps) => {

    return (
        <div
            className="max-w-6xl text-white fira-go page-wrapper py-2 text-center rounded-b-2xl"
            style={{backgroundColor: info.color as string}}
        >
            <div className="">
                {info?.content}
            </div>
        </div>
    );
};

export default TopInfoBanner;
