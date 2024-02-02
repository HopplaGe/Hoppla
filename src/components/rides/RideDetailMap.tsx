"use client"
import React, {useEffect, useState} from 'react';
import {
    useJsApiLoader,
} from '@react-google-maps/api';
import Map from "@/components/shared/trip/Map";

const RideDetailMap = ({from, to}: { from: string | undefined; to: string | undefined; }) => {

    const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult>(
        {
            geocoded_waypoints: [],
            routes: [],
        }
    )

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    })

    useEffect(() => {
        const calculateDistance = async () => {

            const directionsService = new google.maps.DirectionsService();
            const result = await directionsService.route({
                origin: from as string,
                destination: to as string,
                travelMode: google.maps.TravelMode.DRIVING
            })
            if (!result) return

            setDirectionResponse(result)
        }

        isLoaded ? calculateDistance().then(r => r) : null
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    if (!isLoaded) return null;

    return (
        <div className="w-full h-72 bg-gray-500 my-4 rounded-xl overflow-hidden">
            <Map directionResponse={directionResponse}/>
        </div>
    );
}

export default RideDetailMap;
