"use client"
import useDirections from '@/hooks/maps/useDirections'
import {secondsToHours} from '@/lib/tools/secondsToHours'
import {Avatar, AvatarGroup, Badge, Button, useDisclosure} from '@nextui-org/react'
import {BadgeCheck, Check} from 'lucide-react'
import moment from 'moment'
import React, {use, useCallback, useEffect, useRef} from 'react'
import MapModal from './MapModal'
import DirectionsDetails from './DirectionsDetails'
import {toPng} from 'html-to-image';
import {useInterval} from 'usehooks-ts'
import {useTranslations} from 'next-intl'
import Link from "next/link";

const RideDetails = ({ride, searchParams}: any) => {

    const t = useTranslations("Rides.RideDetails")

    const arrivalTime = moment(ride.startTime, "HH:mm").add(secondsToHours(ride.duration!), 'seconds').format("HH:mm");

    const {distance: fromDistance} = useDirections(searchParams.from, ride.from);
    const {distance: toDistance} = useDirections(searchParams.to, ride.to);
    const {
        distance,
        price,
        directionResponse,
        startLatLng,
        endLatLng
    } = useDirections(ride.from, ride.to, searchParams.requested_seats);

    const screenRef = useRef<HTMLDivElement>(null)
    const [sharedImage, setSharedImage] = React.useState("")

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [openLatLng, setOpenLatLng] = React.useState("");

    const handleOpen = (latLng: string) => {
        setOpenLatLng(latLng)
        onOpen();
    }

    // TODO: გასაკეთებელია მძღოლის ვერიფიკაცია
    const isVerified = true;

    // const onScreenShot = useCallback(() => {
    //     console.log('click')
    //     if (screenRef.current === null) {
    //         return
    //     }
    //
    //     toPng(screenRef.current, {cacheBust: true,})
    //         .then((dataUrl) => {
    //             setSharedImage(dataUrl)
    //             // const image = document.createElement('img')
    //             // image.src = dataUrl
    //             // console.log(dataUrl)
    //             // const link = document.createElement('a')
    //             // link.download = 'my-image-name.png'
    //             // link.href = dataUrl
    //             // link.click()
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [screenRef])
    //
    // // useInterval(
    // //     () => {
    // //         onScreenShot()
    // //     },
    // //     1000
    // // )
    //
    // // console.log("image", sharedImage)

    console.log("ride", ride)
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
                    price={price}
                />
            </div>
            <section className="flex flex-col gap-4 w-full lg:w-1/2">

                <Link href={`/user/${ride?.driver.id}`}
                      className="flex flex-row justify-between items-center p-4 fira-go bg-default-100
                    hover:bg-default-200 rounded-xl hoppla-animation">
                    <div className="flex flex-col gap-2 fira-go text-md font-bold">{ride?.driver.name}</div>
                    <div className="flex flex-col gap-2 font-bold text-xl">
                        <Badge
                            isOneChar
                            content={<BadgeCheck className='text-default-50'/>}
                            color="success"
                            placement="bottom-left"
                        >
                            <Avatar src={ride?.driver.image} alt={ride?.driver.name} radius='lg' isBordered={isVerified}
                                    color='success'/>
                        </Badge>
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
                </div>
            </section>
            <MapModal isOpen={isOpen} onClose={onClose} directionResponse={directionResponse} openLatLng={openLatLng}/>
        </>
    )
}

export default RideDetails