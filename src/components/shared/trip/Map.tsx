import React, {useMemo, useCallback, useRef, useEffect} from 'react';
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
} from '@react-google-maps/api';
import locationImg from "@/assets/location-pin.png";

type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = ({directionResponse}: {
    directionResponse: any
}) => {

    const mapRef: React.MutableRefObject<GoogleMap | undefined> = useRef<GoogleMap>();

    const center = useMemo<LatLngLiteral>(() => (
        {
            lat: 41.6938,
            lng: 44.8015
        }
    ), []);
    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        clickableIcons: false,
    }), []);

    const onMapLoad = useCallback((map: any) => (mapRef.current = map), []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            center.lat = pos.lat;
            center.lng = pos.lng;

            mapRef.current?.panTo(pos);
        });
    }, [center])

    return (
        <>
            <GoogleMap
                center={center}
                zoom={12}
                mapContainerStyle={{
                    width: '100%',
                    height: '100%'
                }}
                options={options}
                onLoad={onMapLoad}
            >
                <Marker position={center} icon={
                    {
                        url: locationImg.src,
                        scaledSize: new google.maps.Size(50, 50)
                    }
                } visible={!directionResponse}/>
                {directionResponse && <DirectionsRenderer directions={directionResponse} options={
                    {
                        suppressMarkers: false,
                        markerOptions: {
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
                }/>}
            </GoogleMap>
        </>
    );
};

export default Map;
