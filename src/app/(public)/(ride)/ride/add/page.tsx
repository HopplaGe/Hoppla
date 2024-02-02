"use client";
import {useState, useRef, useEffect, MutableRefObject} from 'react';
import RideAddForm from "@/components/rides/forms/RideAddForm";

import Map from "@/components/shared/trip/Map";

import {useJsApiLoader} from '@react-google-maps/api';
import {meterToKm} from "@/lib/tools/meterToKm";
import {calculatePrice} from "@/lib/tools/calculatePrice";
import * as React from "react";

const AddRide = () => {
    const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult>(
        {
            geocoded_waypoints: [],
            routes: [],
        }
    )
    const [distance, setDistance] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    const originRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const destinationRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [price, setPrice] = useState<number>(totalPrice)
    const [seats, setSeats] = useState<number>(1)

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    })

    useEffect(() => {
        if (seats === 1) {
            setPrice(totalPrice / 4)
        } else {
            setPrice(totalPrice / 4 * seats)
        }

    }, [seats, totalPrice])

    if (!isLoaded) return null;

    const calculateDistance = async () => {
        if (!originRef.current || !destinationRef.current) return;

        const directionsService = new google.maps.DirectionsService();
        const result = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        })
        if (!result) return

        setDirectionResponse(result)
        const distance = meterToKm(result.routes[0].legs[0].distance?.value as number)

        setDistance(distance)
        setDuration(result.routes[0].legs[0].duration?.value as number)

        const price = calculatePrice(distance)

        setTotalPrice(price)
    }

    return (
        <div className="pt-8">

            <div
                className="px-0 lg:px-8 page-wrapper absolute bottom-0 lg:relative w-full  grid grid-cols-1 gap-4 lg:grid-cols-2 py-0 z-20">
                <div className="flex flex-col justify-center bg-white p-4 lg:p-8 rounded-t-md lg:rounded-md">
                    <h2 className="text-sm lg:text-lg font-semibold text-gray-900 mb-6 fira-go">დაზოგეთ <span
                        className="text-primary font-semibold text-xl">{price.toFixed(2)}</span> ლარამდე
                        თქვენი
                        პირველი მგზავრობისას.</h2>
                    <RideAddForm from={originRef} to={destinationRef}
                                 calculateDistance={calculateDistance} distance={distance} duration={duration}
                                 setPrice={setPrice} setSeats={setSeats} seats={seats}
                                 price={price} directionResponse={directionResponse}/>
                </div>
            </div>
            <div
                className="absolute h-4/5 lg:h-screen inset-0 w-full object-cover bg-blend-screen">
                <Map directionResponse={directionResponse}/>
            </div>
        </div>
    );
};

export default AddRide;