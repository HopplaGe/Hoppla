import React from 'react';
import {X} from "lucide-react";
import {IRideFormClear} from "@/interfaces/IRideFormClear";
import {Button} from "@/components/ui/button";

const AddRideFormClear = (
    {
        from,
        to,
        disable,
        setDisable,
        setPrice,
        setSeats,
        setDistanceQuery,
        setDurationQuery
    }: IRideFormClear
) => {
    const clearInputs = () => {
        from.current.value = ""
        to.current.value = ""
        setDisable(true)
        setPrice(0)
        setSeats(1)
        setDistanceQuery(0)
        setDurationQuery(0)
    }

    return (
        <Button
            variant="rideAddFormClear"
            className={`py-6 ${disable ? "opacity-50 cursor-not-allowed invisible" : "hover:bg-red-600 visible"}`}
            onClick={clearInputs}
            disabled={disable}
        >
            <X/>
        </Button>
    );
};

export default AddRideFormClear;
