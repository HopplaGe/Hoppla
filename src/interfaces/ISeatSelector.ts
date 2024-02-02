import React from "react";

export interface ISeatSelector {
    setSeats: React.Dispatch<React.SetStateAction<number>>,
    seats: number,
    disabled: boolean
}