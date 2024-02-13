"use client"
import {cn} from '@/lib/utils'
import {Ride} from '@prisma/client';
import {secondsToHours} from '@/lib/tools/secondsToHours'
import {ChevronRight, PersonStanding} from 'lucide-react'
import Link from 'next/link'
import moment from 'moment'
import {Avatar, AvatarGroup} from '@nextui-org/react';

const RideCard = (ride: any) => {

    const {ride: rideData, driver} = ride;

    const arrivalTime = moment(rideData.startTime, "HH:mm").add(secondsToHours(rideData.duration!), 'seconds').format("HH:mm");

    return (
        <>
            <div className='relative group'>
                <div aria-label={"Pick-up location"}
                     className="group min-h-10 hover:bg-gray-100 transform transition-all duration-300 ease-in-out">
                    <Link href="#" className="flex flex-col px-6">
                        <div className="flex justify-between">
                            <div className="flex flex-col pt-1">
                                <time className="fira-go text-primary w-12 font-semibold text-lg">
                                    {rideData.startTime}
                                </time>
                                <span
                                    className="text-gray-500 text-xs font-semibold">{secondsToHours(rideData.duration!)}</span>
                            </div>

                            <div aria-hidden="true"
                                 className="relative flex flex-col items-center min-h-10 flex-shrink-0 mx-2 w-2">
                                <div className={cn("w-1 h-3", "bg-transparent")}></div>
                                <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
                                    <div
                                        className="bg-white box-border w-3 h-3 rounded-full border-2 border-primary"
                                        aria-hidden="true"></div>
                                </div>
                                <div className={cn("w-1 h-full", "bg-primary")}></div>
                            </div>

                            <div className="relative flex-1 py-2 pr-4 flex flex-col gap-2">
                                <div className="flex flex-col gap-0">
                                    <span
                                        className="text-sm fira-go">{rideData.from.split(",").slice(0, -2)}</span>
                                    <span className="text-xs fira-go">
                                        {rideData.from.split(",").slice(-2).join(",")}
                                    </span>
                                </div>

                                <div className="flex gap-2 justify-start items-center">
                                    <div className={cn("rounded-full text-white", "bg-success")}>
                                        <PersonStanding size={16}/>
                                    </div>
                                    <span
                                        className="text-[10px] text-success uppercase">743 m from your departure</span>
                                </div>
                                {/* <div className="absolute top-1/2 right-0 -translate-y-1/2 group-hover:text-red-600">
                                    <ChevronRight />
                                </div> */}
                            </div>
                        </div>
                    </Link>
                </div>
                <div aria-label={"Drop-off location"}
                     className="group min-h-10 hover:bg-gray-100 transform transition-all duration-300 ease-in-out">
                    <Link href="#" className="flex flex-col px-6">
                        <div className="flex justify-between">
                            <div className="flex flex-col pt-1">
                                <time className="fira-go text-primary w-12 font-semibold text-lg">
                                    {arrivalTime}
                                </time>
                                <span className="text-gray-500 text-xs font-semibold"></span>
                            </div>

                            <div aria-hidden="true"
                                 className="relative flex flex-col items-center min-h-10 flex-shrink-0 mx-2 w-2">
                                <div className={cn("w-1 h-3", "bg-primary")}></div>
                                <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
                                    <div
                                        className="bg-white box-border w-3 h-3 rounded-full border-2 border-primary"
                                        aria-hidden="true"></div>
                                </div>
                                <div className={cn("w-1 h-full", "bg-transparent")}></div>
                            </div>

                            <div className="relative flex-1 py-2 pr-4 flex flex-col gap-2">
                                <div className="flex flex-col gap-0">
                                    <span
                                        className="text-sm fira-go">{rideData.to.split(",").slice(0, -2)}</span>
                                    <span className="text-xs fira-go">
                                        {rideData.to.split(",").slice(-2).join(",")}
                                    </span>
                                </div>

                                <div className="flex gap-2 justify-start items-center">
                                    <div className={cn("rounded-full text-white", "bg-success")}>
                                        <PersonStanding size={16}/>
                                    </div>
                                    <span
                                        className="text-[10px] text-success uppercase">743 m from your departure</span>
                                </div>
                                {/* <div className="absolute top-1/2 right-0 -translate-y-1/2 group-hover:text-red-600">
                                    <ChevronRight />
                                </div> */}
                            </div>
                        </div>
                    </Link>
                </div>
                <div
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-default-100 fira-go text-xl font-semibold text-default-600 group-hover:bg-primary group-hover:text-white px-4 py-2 rounded-xl">
                    {rideData.price} ₾
                </div>
            </div>
            <div className="flex justify-between px-6 py-2 bg-default-100">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="rounded-xl text-white p-0.5">
                            <Avatar radius="md" size="sm" src={driver?.image}/>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm fira-go">{driver?.name}</span>
                            <span className="text-xs fira-go">
                                <span className="text-gray-500">4.3</span>
                                <span className="text-yellow-400">★</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="">
                    {/* <span className="text-sm fira-go">{rideData.price} €</span> */}
                    <div className="flex flex-row text-sm fira-go">
                        <AvatarGroup>
                            {rideData.passangers && rideData?.passangers?.map((passanger: any, index: number) => (
                                <Avatar key={index} radius="md" size="sm" src={passanger.image}/>
                            ))}
                        </AvatarGroup>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RideCard