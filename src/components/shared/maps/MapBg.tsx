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

const MapBg = () => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapConfig.googleMapApiKey,
        libraries: libraries as Libraries,
        language: "ka"
    });

    const mapRef: React.MutableRefObject<GoogleMap | undefined> = useRef<GoogleMap>();


    const center = useMemo<LatLngLiteral>(() => (
        {
            lat: 41.6938,
            lng: 44.8015
        }
    ), []);

    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: true,
        zoomControl: false,
        clickableIcons: false,
        scrollwheel: false,
        draggable: false,
        styles: mapConfig.mapOptions.styles
    }), []);

    const onMapLoad = useCallback((map: any) => (mapRef.current = map), []);

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
            </GoogleMap>
        </>
    ) : null;
};

export default MapBg;
