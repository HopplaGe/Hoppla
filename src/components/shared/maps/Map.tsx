"use client"
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    Libraries,
} from '@react-google-maps/api';
import LatLngLiteral = google.maps.LatLngLiteral;
import MapOptions = google.maps.MapOptions;

import locationImg from "@/assets/images/location-pin.png";
import useDirections from "@/hooks/maps/useDirections";
import {mapConfig} from "@/config/map.config";
import useGeoCode from "@/hooks/maps/useGeoCode";

type MapProps = {
    from: string;
    to: string;
    setAddress?: (address: string) => void;
    setDisabled?: (disabled: boolean) => void;
}

const libraries = ["places"];

const Map = ({from, to, setAddress, setDisabled}: MapProps) => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapConfig.googleMapApiKey,
        libraries: libraries as Libraries,
        language: "ka"
    });

    const {startLatLng} = useDirections(from, to);


    const [markerLocation, setMarkerLocation] = useState<LatLngLiteral>({
        lat: 0,
        lng: 0
    });

    // console.log(markerLocation);

    useEffect(() => {
        setMarkerLocation({
            lat: parseFloat(startLatLng.split(",")[0]),
            lng: parseFloat(startLatLng.split(",")[1])
        });
    }, [startLatLng]);


    const mapRef: React.MutableRefObject<GoogleMap | undefined> = useRef<GoogleMap>();


    const center = useMemo<LatLngLiteral>(() => (
        {
            lat: parseFloat(startLatLng.split(",")[0]) || 0,
            lng: parseFloat(startLatLng.split(",")[1]) || 0
        }
    ), [startLatLng]);

    const options = useMemo<MapOptions>(() => (mapConfig.mapOptions), []);

    const onMapLoad = useCallback((map: any) => (mapRef.current = map), []);

    const markerDragEnd = (e: any) => {
        setDisabled && setDisabled(false);
        setMarkerLocation({lat: e.latLng.lat(), lng: e.latLng.lng()});
    }

    const {addressName} = useGeoCode({
        lat: markerLocation.lat ? markerLocation.lat : parseFloat(startLatLng.split(",")[0]),
        lng: markerLocation.lng ? markerLocation.lng : parseFloat(startLatLng.split(",")[1]),
        locale: "ka"
    });

    useEffect(() => {
        if (addressName && from) {
            if (from !== addressName) {
                if (typeof setAddress === "function") {
                    setAddress(addressName);
                }
            }
        }
    }, [addressName, from, setAddress]);

    return isLoaded ? (
        <>
            <GoogleMap
                center={{
                    lat: center.lat,
                    lng: center.lng
                }}
                zoom={15}
                mapContainerStyle={{
                    width: '100%',
                    height: '100%'
                }}
                options={options}
                onLoad={onMapLoad}
            >
                <Marker
                    draggable={true}
                    position={{
                        lat: markerLocation.lat,
                        lng: markerLocation.lng
                    }}
                    icon={
                        {
                            url: locationImg.src,
                            scaledSize: new window.google.maps.Size(50, 50)
                        }
                    }
                    onDragEnd={(e: any) => markerDragEnd(e)}
                    // visible={!directionResponse}
                />
                {/*{directionResponse && <DirectionsRenderer directions={directionResponse} options={*/}
                {/*    {*/}
                {/*        suppressMarkers: false,*/}
                {/*        markerOptions: {*/}
                {/*            icon: {*/}
                {/*                url: locationImg.src,*/}
                {/*                scaledSize: new window.google.maps.Size(50, 50)*/}
                {/*            },*/}
                {/*        },*/}
                {/*        polylineOptions: {*/}
                {/*            strokeColor: "#e84e3e",*/}
                {/*            strokeOpacity: 0.8,*/}
                {/*            strokeWeight: 10,*/}
                {/*        }*/}
                {/*    }*/}
                {/*}/>}*/}
            </GoogleMap>
        </>
    ) : null;
};

export default Map;
