import React from "react";

export interface IRideFormClear {
    from: React.MutableRefObject<HTMLInputElement>
    to: React.MutableRefObject<HTMLInputElement>
    disable: boolean
    setDisable: React.Dispatch<React.SetStateAction<boolean>>
    setPrice: React.Dispatch<React.SetStateAction<number>>
    setDistanceQuery: React.Dispatch<React.SetStateAction<number>>
    setDurationQuery: React.Dispatch<React.SetStateAction<number>>
    setSeats: React.Dispatch<React.SetStateAction<number>>
}