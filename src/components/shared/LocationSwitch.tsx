"use client";
import React from 'react';
import {useGetCountries} from "@/hooks/maps/useGetCountries";
import {Select, SelectItem} from "@nextui-org/react";

const LocationSwitch = () => {

    const {data: countries, isLoading, error} = useGetCountries();

    if (error) return <p>Error...</p>
    if (isLoading) return <p>Loading...</p>

    const handleCountryChange = (e: any) => {
        console.log(e.target.value);
    }

    return (
        <div>
            <Select
                size="sm"
                className="w-44 fira-go -z-0"
                variant="flat"
                defaultSelectedKeys={[countries?.find((country) => country.code === 'GE')?.id]}
                onChange={handleCountryChange}
                label="აირჩიე ქვეყანა"
            >
                {(countries ?? []).map((country) => (

                    <SelectItem key={country.id} value={country.id}>
                        {country.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default LocationSwitch;
