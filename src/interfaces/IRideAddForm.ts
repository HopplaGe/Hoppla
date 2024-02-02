import React, {RefObject} from 'react';

export interface IRideAddForm {
    from: RefObject<any>,
    to: RefObject<any>,
    calculateDistance: () => void,
    distance: number,
    duration: number,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    setSeats: React.Dispatch<React.SetStateAction<number>>,
    seats: number,
    price: number,
    directionResponse: google.maps.DirectionsResult,
}