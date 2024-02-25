"use client"
import {meterToKm} from '@/lib/tools/meterToKm'
import {secondsToHours} from '@/lib/tools/secondsToHours'
import {cn} from '@/lib/utils'
import {ChevronRight, PersonStanding} from 'lucide-react'
import {useTranslations} from 'next-intl'
import React from 'react'

type DirectionsDetailsProps = {
    ride: any
    fromDistance: number
    toDistance: number
    startLatLng: string
    endLatLng: string
    arrivalTime: string
    handleOpen: (latLng: string) => void
    searchParams: {
        requested_seats: number
    }
    price: number
}

const DirectionsDetails = ({
                               ride,
                               fromDistance,
                               toDistance,
                               startLatLng,
                               endLatLng,
                               arrivalTime,
                               handleOpen,
                               searchParams,
                               price
                           }: DirectionsDetailsProps) => {

    const t = useTranslations("Rides.RideDetails")

    return (
        <>
            <div id='card' className='relative group  bg-white rounded-xl overflow-hidden'>
                <div aria-label={"Pick-up location"} onClick={() => handleOpen(startLatLng)}
                     className="group min-h-10 hover:bg-gray-100 hover:rounded-xl transform transition-all duration-300 ease-in-out pt-2 cursor-pointer">
                    <div className="flex flex-col px-6">
                        <div className="flex justify-between">
                            <div className="flex flex-col pt-1">
                                <time className="fira-go text-primary w-12 font-semibold text-lg">
                                    {ride.startTime}
                                </time>
                                <span
                                    className="text-gray-500 text-xs font-semibold">{secondsToHours(ride.duration!)}</span>
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
                                        className="text-sm fira-go">{ride.from.split(",").slice(0, -2)}</span>
                                    <span className="text-xs fira-go">
                                        {ride.from.split(",").slice(-2).join(",")}
                                    </span>
                                </div>

                                <div className="flex gap-2 justify-start items-center">
                                    <div className={cn("rounded-md text-white",
                                        fromDistance < 1000 && "bg-success",
                                        fromDistance > 1000 && fromDistance < 5000 && "bg-warning",
                                        fromDistance > 5000 && "bg-danger"
                                    )}>
                                        <PersonStanding size={16}/>
                                    </div>
                                    <span
                                        className={cn(
                                            fromDistance < 1000 && "text-success",
                                            fromDistance > 1000 && fromDistance < 5000 && "text-warning",
                                            fromDistance > 5000 && "text-danger",
                                            "text-[10px] uppercase fira-go"
                                        )}>
                                        {t('distanceFromDeparture', {distance: meterToKm(fromDistance)})}
                                    </span>
                                </div>
                                <div className="absolute top-1/2 right-0 -translate-y-1/2 group-hover:text-red-600">
                                    <ChevronRight/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div aria-label={"Drop-off location"} onClick={() => handleOpen(endLatLng)}
                     className="group min-h-10 hover:bg-gray-100 hover:rounded-xl transform transition-all duration-300 ease-in-out cursor-pointer">
                    <div className="flex flex-col px-6">
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
                                        className="text-sm fira-go">{ride.to.split(",").slice(0, -2)}</span>
                                    <span className="text-xs fira-go">
                                        {ride.to.split(",").slice(-2).join(",")}
                                    </span>
                                </div>

                                <div className="flex gap-2 justify-start items-center">
                                    <div className={cn("rounded-md text-white",
                                        toDistance < 1000 && "bg-success",
                                        toDistance > 1000 && toDistance < 5000 && "bg-warning",
                                        toDistance > 5000 && "bg-danger"
                                    )}>
                                        <PersonStanding size={16}/>
                                    </div>
                                    <span
                                        className={cn(
                                            toDistance < 1000 && "text-success",
                                            toDistance > 1000 && toDistance < 5000 && "text-warning",
                                            toDistance > 5000 && "text-danger",
                                            "text-[10px] uppercase fira-go"
                                        )}>
                                        {t('distanceToArrival', {distance: meterToKm(toDistance)})}
                                    </span>
                                </div>
                                <div className="absolute top-1/2 right-0 -translate-y-1/2 group-hover:text-red-600">
                                    <ChevronRight/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-row justify-between items-center border-t-4 p-4 fira-go border-default-50 w-full mt-4">
                    <div
                        className="flex flex-col gap-2">{t('priceForOnePerson', {count: searchParams.requested_seats ? searchParams.requested_seats : 1})}</div>
                    <div
                        className="flex flex-col gap-2 font-bold text-xl">
                        {/*{(ride.price / ride.seats * searchParams.requested_seats).toFixed(2)} ₾*/}
                        {searchParams.requested_seats ? (ride.price * searchParams.requested_seats).toFixed(2) : price.toFixed(2)} ₾
                    </div>
                </div>
            </div>
        </>
    )
}

export default DirectionsDetails