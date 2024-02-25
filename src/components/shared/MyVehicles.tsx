"use client";
import React from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {Button, Image} from "@nextui-org/react";
import AddCarModel from "@/components/shared/AddCarModel";
import {myVehicles} from "@/types/myVehicles";
import {Trash} from "lucide-react";
import {cn} from "@/lib/utils";
import {useTranslations} from "next-intl";

const MyVehicles = ({cars}: myVehicles) => {
    const t = useTranslations('MyCars');

    return (
        <div>
            <h2 className="font-bold text-xl mb-4 fira-go">{t("MyVehicles")}</h2>
            <div role="list"
                 className={cn(`grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-10 gap-4 justify-center items-center relative`)}>
                <AddCarModel/>
                {cars && cars.length > 0 ? cars.map((car, index) => (
                        <Popover key={index} showArrow placement="bottom">
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <PopoverTrigger
                                className={cn(`cursor-pointer bg-white p-4 shadow-lg border-b-2 border-opacity-5`)} style={{
                                borderColor: `${car.color.toLowerCase()}`,
                            }}>
                                <Image
                                    src={`https://hopplaassets.s3.amazonaws.com/images/cars/${car.brand.toLowerCase()}.svg`}
                                    alt={"car"} width={64} height={64}
                                    className="w-20 lg:w-16"/>
                            </PopoverTrigger>
                            <PopoverContent className="p-1 w-64">
                                <li
                                    key={index}
                                    className="w-full flex flex-col gap-2 px-4 py-2 items-start cursor-pointer fira-go">

                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex flex-col w-full">
                                            <div className="flex justify-between items-center w-full">
                                                <h3 className="text-lg font-bold flex gap-2 items-center ">{car.brand}
                                                    <div className="w-4 h-4 rounded-md"
                                                         style={{background: `${car.color.toLowerCase()}`}}/>
                                                </h3>
                                                <Button variant="ghost" className="text-xs"
                                                        onClick={() => {
                                                        }}>
                                                    <Trash width={12}/>
                                                </Button>
                                            </div>
                                            <span className="text-xs">{car.model} {car.year}</span>

                                        </div>

                                    </div>
                                    <div
                                        className="flex flex-col justify-center items-center w-full">
                                        <div className="my-2">
                                            <div className="font-bold">
                                                <span className="car-plate-ui"> {car.plateNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </PopoverContent>
                        </Popover>
                    )) :
                    <div
                        className={cn(`text-center text-gray-500 ${cars && cars.length === 0 && "col-span-3"} text-left fira-go`)}>{t('NoVehicles')}</div>}
            </div>
        </div>
    );
};

export default MyVehicles;
