import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from '@react-google-maps/api';
import locationImg from "@/assets/images/location-pin.png";

type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const DirectionMap = ({ directionResponse, latLng }: {
    directionResponse: any,
    latLng: string
}) => {


    const mapRef: React.MutableRefObject<GoogleMap | undefined> = useRef<GoogleMap>();

    const center = useMemo<LatLngLiteral>(() => (
        {
            lat: latLng ? parseFloat(latLng.split(",")[0]) : 41.7151,
            lng: latLng ? parseFloat(latLng.split(",")[1]) : 44.8271
        }
    ), [latLng]);

    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        clickableIcons: false,
    }), []);

    const onMapLoad = useCallback((map: any) => (mapRef.current = map), []);

    return (
        <>
            <GoogleMap
                center={center}
                zoom={18}
                mapContainerStyle={{
                    width: '100%',
                    height: '100%'
                }}
                options={options}
                onLoad={onMapLoad}
            >
                <Marker
                    animation={google.maps.Animation.DROP}
                    position={center}
                    icon={
                        {
                            url: locationImg.src,
                            scaledSize: new google.maps.Size(50, 50),
                        }
                    } visible={!directionResponse} />
                {directionResponse && <DirectionsRenderer directions={directionResponse} options={
                    {
                        suppressMarkers: false,
                        directions: directionResponse,
                        preserveViewport: true,
                        markerOptions: {
                            position: center,
                            animation: google.maps.Animation.BOUNCE,
                            clickable: true,
                            icon: {
                                url: locationImg.src,
                                scaledSize: new google.maps.Size(50, 50)
                            }
                        },
                        polylineOptions: {
                            strokeColor: "#e84e3e",
                            strokeOpacity: 0.8,
                            strokeWeight: 10,
                        }
                    }
                } />}
            </GoogleMap>
        </>
    );
};

export default DirectionMap;