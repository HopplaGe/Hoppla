"use client"
import useDirections from '@/hooks/maps/useDirections'
import {secondsToHours} from '@/lib/tools/secondsToHours'
import {Avatar, AvatarGroup, Badge, Button, useDisclosure} from '@nextui-org/react'
import {BadgeCheck, Check, Facebook} from 'lucide-react'
import moment from 'moment'
import MapModal from './MapModal'
import DirectionsDetails from './DirectionsDetails'

import {useTranslations} from 'next-intl'
import Link from "next/link";
import {useSession} from "next-auth/react";
import {useState} from "react";
import useCaptureImage from "@/hooks/useCaptureImage";

const RideDetails = ({ride, searchParams}: any) => {

    const session = useSession()
    const user = session.data?.user

    const t = useTranslations("Rides.RideDetails")

    const arrivalTime = moment(ride.startTime, "HH:mm").add(secondsToHours(ride.duration!), 'seconds').format("HH:mm");

    const {distance: fromDistance} = useDirections(searchParams.from, ride.from);
    const {distance: toDistance} = useDirections(searchParams.to, ride.to);
    const {
        directionResponse,
        startLatLng,
        endLatLng
    } = useDirections(ride.from, ride.to, searchParams.requested_seats);

    const {screenRef, handleShare, sharedImage} = useCaptureImage();


    const {isOpen, onOpen, onClose} = useDisclosure();
    const [openLatLng, setOpenLatLng] = useState("");

    const handleOpen = (latLng: string) => {
        setOpenLatLng(latLng)
        onOpen();
    }

    // TODO: გასაკეთებელია მძღოლის ვერიფიკაცია
    const isVerified = true;

    return (
        <>
            <div ref={screenRef} className='w-full lg:w-1/2 max-w-7xl'>
                <DirectionsDetails
                    ride={ride}
                    fromDistance={fromDistance}
                    toDistance={toDistance}
                    startLatLng={startLatLng}
                    endLatLng={endLatLng}
                    arrivalTime={arrivalTime}
                    handleOpen={handleOpen}
                    searchParams={searchParams}
                    price={ride.price}
                />
            </div>
            <section className="flex flex-col gap-4 w-full lg:w-1/2">

                <Link href={`/user/${ride?.driver.id}`}
                      className="flex flex-row justify-between items-center p-4 fira-go bg-default-100
                    hover:bg-default-200 rounded-xl hoppla-animation">
                    <div className="flex flex-col gap-2 fira-go text-md font-bold">{ride?.driver.name}</div>
                    <div className="flex flex-col gap-2 font-bold text-xl">
                        {
                            ride?.driver?.phone ? (
                                <Badge
                                    isOneChar
                                    content={<BadgeCheck className='text-default-50'/>}
                                    color="success"
                                    placement="bottom-left"
                                >
                                    <Avatar src={ride?.driver.image} alt={ride?.driver.name} radius='lg' isBordered
                                            color='success'/>
                                </Badge>
                            ) : (
                                <Avatar src={ride?.driver.image} alt={ride?.driver.name} radius='lg'/>
                            )
                        }
                    </div>
                </Link>
                {ride?.trip?.passangers.length > 0 && (
                    <div
                        className="flex flex-row justify-between items-center p-4 fira-go hover:bg-default-100 rounded-xl hoppla-animation">
                        <div className="flex flex-col gap-2 fira-go text-sm font-bold">{t("passengers")}</div>
                        <div className="flex flex-col gap-2 font-bold text-xl">
                            <AvatarGroup>
                                {ride?.trip?.passangers && ride?.trip?.passangers?.map((passanger: any, index: number) => (
                                    <Avatar key={index} radius="md" size="sm" src={passanger.image}/>
                                ))}
                            </AvatarGroup>
                        </div>
                    </div>
                )}
            </section>

            <section className="flex flex-col gap-4 w-full md:w-1/2 px-4">
                {ride?.rideRules && ride.rideRules.map((rule: any, index: number) => (
                    <div
                        key={index}
                        className="flex flex-row justify-between items-center fira-go ">
                        <div className="flex flex-row gap-2 items-center fira-go text-xs font-bold">
                            <i className="bg-default-200 p-1 rounded-md">
                                <Check size={14}/>
                            </i>
                            {rule.rule.name}
                        </div>

                    </div>
                ))}
            </section>

            <section className="flex flex-col gap-4 w-full md:w-1/2">
                <div className="flex flex-row justify-between items-center border-t-4 p-4 fira-go border-default-100">
                    {user?.id !== ride?.driver.id ? (
                            <Button
                                className="w-full"
                                color="secondary"
                                variant='solid'
                                size="lg"
                                onClick={() => {
                                    console.log("დაჯავშნა")
                                }}
                            >
                                დაჯავშნა
                            </Button>
                        )
                        : (
                            <div className="w-full flex flex-row gap-2 justify-center">
                                <Button
                                    className="bg-[#1877F2] text-white"
                                    variant='solid'
                                    size="sm"
                                    onClick={() => handleShare()}
                                    startContent={<Facebook/>}
                                >
                                    გაზიარება
                                </Button>
                                <Button
                                    color="default"
                                    variant='solid'
                                    size="sm"
                                    onClick={() => {
                                        console.log("გაზიარება")
                                    }}
                                    startContent={<Facebook/>}
                                >
                                    გაზიარება
                                </Button>
                            </div>
                        )
                    }
                </div>
            </section>
            <MapModal isOpen={isOpen} onClose={onClose} directionResponse={directionResponse} openLatLng={openLatLng}/>
        </>
    )
}

export default RideDetails