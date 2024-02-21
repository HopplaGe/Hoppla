"use client"
import React from 'react';
import {Star} from "lucide-react";
import {useTranslations} from "next-intl";

const RatingsBlock = () => {
    const t = useTranslations("UserInformation");
    return (
        <div
            className='relative group rounded-xl overflow-hidden border-y-0 p-4 fira-go border-default-100 w-full flex flex-row justify-between items-center gap-4'>
            <div className="flex flex-row justify-start items-center gap-4">
                <i className="p-1 rounded-md font-bold bg-yellow-500 text-white">
                    <Star size={16}/>
                </i>
                <span className="text-medium lg:text-lg font-bold">
                        4.3 / 5
                    </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-2">
                <span className="text-xs md:text-sm">
                    {t.rich('Ratings', {
                            rating: 0,
                            ratingCount: (chunks) => <span
                                className="text-xs md:text-sm font-bold text-primary">{chunks}</span>
                        }
                    )}
                </span>
            </div>
        </div>
    );
};

export default RatingsBlock;
