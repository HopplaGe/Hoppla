"use client"
import React from 'react';
import {Trash} from "lucide-react";
import AddCarModal from "@/components/dashboard/AddCarModal";
import {Button} from "@/components/ui/button";
import {deleteCar} from "@/lib/actions/cars";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {IMyCars} from "@/interfaces/IMyCars";

const MyCars = ({cars}: IMyCars) => {

    const router = useRouter()
    const delCar = async (id: string) => {
        await deleteCar(id)
        router.refresh()
    }

    return (
        <div>
            <div className="flex flex-col gap-2 fira-go my-4">
                <h2 className="font-bold text-xl text-secondary">ჩემი ავტომობილები</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">


                <div role="list" className="grid grid-cols-3 lg:grid-flow-col gap-4 justify-center items-center">
                    <AddCarModal/>
                    {cars.map((car, index) => (
                        <Popover key={index} showArrow placement="bottom">
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <PopoverTrigger className="cursor-pointer">
                                <Image src={`/cars/${car.brand.toLowerCase()}.svg`} alt={"car"} width={64} height={64}
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
                                                        onClick={() => delCar(car.id)}>
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyCars;


