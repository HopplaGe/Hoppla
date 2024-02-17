"use client"
import html2canvas from 'html2canvas'
import useDirections from '@/hooks/maps/useDirections'
import { meterToKm } from '@/lib/tools/meterToKm'
import { secondsToHours } from '@/lib/tools/secondsToHours'
import { cn } from '@/lib/utils'
import { Avatar, AvatarGroup, Badge, Button, useDisclosure } from '@nextui-org/react'
import { Ride } from '@prisma/client'
import { BadgeCheck, Check, CheckIcon, ChevronRight, PersonStanding } from 'lucide-react'
import moment from 'moment'
import React, { useEffect } from 'react'
import MapModal from './MapModal'

const RideDetails = ({ ride, searchParams, driver }: any) => {

    const arrivalTime = moment(ride.startTime, "HH:mm").add(secondsToHours(ride.duration!), 'seconds').format("HH:mm");

    const { distance: fromDistance } = useDirections(searchParams.from, ride.from);
    const { distance: toDistance } = useDirections(searchParams.to, ride.to);
    const { distance, price, directionResponse, startLatLng, endLatLng } = useDirections(ride.from, ride.to, searchParams.requested_seats);

    const [imageForShare, setImageForShare] = React.useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [openLatLng, setOpenLatLng] = React.useState("");

    const handleOpen = (latLng: string) => {
        setOpenLatLng(latLng)
        onOpen();
    }

    // TODO: გასაკეთებელია მძღოლის ვერიფიკაცია
    const isVerified = true;

    // TODO: გასაკეთებელია სქრინშოტის გამოყენება
    // function screenshot() {
    //     html2canvas(global.window.document.getElementById('card') as HTMLElement).then((canvas: any) => {
    //         const image = canvas.toDataURL("image/png");
    //         setImageForShare(image);
    //         // console.log("image => ", image); //image in base64
    //         // var pHtml = "<img src="+image+" />";
    //         // var w = window.open('about:blank');
    //         // // You might want to do something with `w` or `pHtml` here
    //     });
    // }

    // useEffect(() => {
    //     screenshot()
    // }, [])



    return (
        <>
            <div id='card' className='relative group mx-auto w-1/2 max-w-7xl'>
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
                                        <PersonStanding size={16} />
                                    </div>
                                    <span
                                        className={cn(
                                            fromDistance < 1000 && "text-success",
                                            fromDistance > 1000 && fromDistance < 5000 && "text-warning",
                                            fromDistance > 5000 && "text-danger",
                                            "text-[10px] uppercase fira-go"
                                        )} aria-label="Distance from departure location">
                                        {meterToKm(fromDistance)} კმ თქვენს დანიშნულებამდე</span>
                                </div>
                                <div className="absolute top-1/2 right-0 -translate-y-1/2 group-hover:text-red-600">
                                    <ChevronRight />
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
                                        <PersonStanding size={16} />
                                    </div>
                                    <span
                                        className={cn(
                                            toDistance < 1000 && "text-success",
                                            toDistance > 1000 && toDistance < 5000 && "text-warning",
                                            toDistance > 5000 && "text-danger",
                                            "text-[10px] uppercase fira-go"
                                        )} aria-label="Distance from departure location">
                                        {meterToKm(toDistance)} კმ თქვენს დანიშნულებამდე</span>
                                </div>
                                <div className="absolute top-1/2 right-0 -translate-y-1/2 group-hover:text-red-600">
                                    <ChevronRight />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="flex flex-col gap-4 w-1/2">
                <div className="flex flex-row justify-between items-center border-y-4 p-4 fira-go border-default-100">
                    <div className="flex flex-col gap-2">ფასი {searchParams.requested_seats} მგზავრისთვის</div>
                    {/* TODO:  price / >>>> ride.seats <<<<< * searchParams.requested_seats*/}
                    <div className="flex flex-col gap-2 font-bold text-xl">{(price / ride.seats * searchParams.requested_seats).toFixed(2)} ₾</div>
                </div>
                <div className="flex flex-row justify-between items-center p-4 fira-go hover:bg-default-100 rounded-xl hoppla-animation">
                    <div className="flex flex-col gap-2 fira-go text-md font-bold">{driver.name}</div>
                    <div className="flex flex-col gap-2 font-bold text-xl">
                        <Badge
                            isOneChar
                            content={<BadgeCheck className='text-default-50' />}
                            color="success"
                            placement="bottom-left"
                        >
                            <Avatar src={driver.image} alt={driver.name} radius='lg' isBordered={isVerified} color='success' />
                        </Badge>
                    </div>
                </div>
                {ride.passangers.length > 0 && (
                    <div className="flex flex-row justify-between items-center p-4 fira-go hover:bg-default-100 rounded-xl hoppla-animation">
                        <div className="flex flex-col gap-2 fira-go text-md font-bold">მგზავრები</div>
                        <div className="flex flex-col gap-2 font-bold text-xl">
                            <AvatarGroup>
                                {ride.passangers && ride?.passangers?.map((passanger: any, index: number) => (
                                    <Avatar key={index} radius="md" size="sm" src={passanger.image} />
                                ))}
                            </AvatarGroup>
                        </div>
                    </div>
                )}
            </section>

            <section className="flex flex-col gap-4 w-1/2">
                <div className="flex flex-row justify-between items-center border-t-4 p-4 fira-go border-default-100">
                    <Button
                        className="w-full"
                        color="secondary"
                        variant='solid'
                        size="lg"
                        onClick={() => {
                            console.log('Booked')
                        }}
                    >
                        დაჯავშნა
                    </Button>
                </div>
            </section>
            <MapModal isOpen={isOpen} onClose={onClose} directionResponse={directionResponse} openLatLng={openLatLng} />
        </>
    )
}

export default RideDetails