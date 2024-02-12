"use client";
import React, {useEffect, useState} from "react";
import {calculatePrice} from "@/lib/tools/calculatePrice";
import {Libraries, useJsApiLoader} from "@react-google-maps/api";

const libraries = ["places"];

type UseDirections = {
    from?: string;
    to?: string;
};

const useDirections = (
    from: string,
    to: string
) => {

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as Libraries
    });

    const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult>(
        {
            geocoded_waypoints: [],
            routes: [],
        }
    )

    useEffect(() => {
        if (directionResponse?.routes[0]?.legs[0]) {
            setDistance(directionResponse?.routes[0]?.legs[0]?.distance?.value as number)
            setDuration(directionResponse?.routes[0]?.legs[0]?.duration?.value as number)
            setStartLatLng(directionResponse?.routes[0]?.legs[0]?.start_location.lat() + "," + directionResponse?.routes[0]?.legs[0]?.start_location.lng())
            setEndLatLng(directionResponse?.routes[0]?.legs[0]?.end_location.lat() + "," + directionResponse?.routes[0]?.legs[0]?.end_location.lng())
        }
    }, [directionResponse?.routes]);

    // const distance = directionResponse?.routes[0]?.legs[0]?.distance?.value as number
    // const duration = directionResponse?.routes[0]?.legs[0]?.duration?.value as number
    // const startLatLng = directionResponse?.routes[0]?.legs[0]?.start_location.lat() + "," + directionResponse?.routes[0]?.legs[0]?.start_location.lng()
    // const endLatLng = directionResponse?.routes[0]?.legs[0]?.end_location.lat() + "," + directionResponse?.routes[0]?.legs[0]?.end_location.lng()

    const [price, setPrice] = useState(0)
    const [distance, setDistance] = useState(0)
    const [duration, setDuration] = useState(0)
    const [startLatLng, setStartLatLng] = useState("")
    const [endLatLng, setEndLatLng] = useState("")

    useEffect(() => {
        if (isLoaded && from && to) {
            const directionsService = new google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: from,
                    destination: to,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirectionResponse(result as google.maps.DirectionsResult);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
            if (distance && duration) {
                setPrice(calculatePrice(distance, duration))
            }
        }
    }, [isLoaded, distance, duration, from, to])

    if (!isLoaded) return {directionResponse, price, distance, duration, startLatLng, endLatLng};

    return {
        directionResponse,
        price,
        distance,
        duration,
        startLatLng,
        endLatLng
    };
};

export default useDirections;
