import {Dispatch, RefObject, SetStateAction} from "react";

export interface IRideAddInput {
    inputRef: any,
    from: RefObject<HTMLInputElement>,
    to: RefObject<HTMLInputElement>,
    placeholder: string,
    name: string,
    setDisable: Dispatch<SetStateAction<boolean>>,
    setSeats: Dispatch<SetStateAction<number>>,
    distance: number,
    duration: number,
    // calculateDistance: () => void
}