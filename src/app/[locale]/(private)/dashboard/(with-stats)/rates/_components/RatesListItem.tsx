"use client";
import React from 'react';
import Image from "next/image";
import {Avatar} from "@nextui-org/react";
import moment from "moment";
import 'moment/locale/ka';
import {useLocale} from "next-intl";
import {HeartHandshake, Star} from "lucide-react";

type RatesListItemProps = {
    rating: any;
}

const RatesListItem = ({rating}: RatesListItemProps) => {
    const locale = useLocale()

    return (

        <div className="flex items-start gap-2.5 fira-go">
            <div className="">
                <Avatar src={rating.author.image} alt={rating.author.name} size="md" radius="lg"/>
            </div>
            <div className="flex flex-col gap-2.5">
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                    <div className="flex flex-col items-start gap-0.5">
                        <span
                            className="text-sm font-semibold text-gray-900 dark:text-white">{rating.author.name}</span>
                        <div className="flex items-center gap-1.5">
                            {Array.from({length: 5}, (_, index) => (
                                <HeartHandshake key={index} size={16} className={
                                    rating.rating > index ? "text-primary" : "text-gray-300 dark:text-gray-500"
                                }/>
                            ))}
                        </div>
                    </div>
                    <span
                        className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(rating.createdAt).locale(locale).format("LL")}</span>
                </div>
                <div className="leading-1.5 flex w-full flex-col">
                    <div className="flex items-start bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <div className="me-2">
                           <span
                               className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                              {rating.comment}
                           </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default RatesListItem;
