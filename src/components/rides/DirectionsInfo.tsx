import React from 'react';
import {MapPin} from "lucide-react";

interface IDirectionsInfo {
    from: string,
    to: string,
    stopPlaceField:
        {
            name: string
        }[]
}

const DirectionsInfo = ({
                            from,
                            to,
                            stopPlaceField
                        }: IDirectionsInfo) => {
    return (
        <ul role="list" className="overflow-y-auto px-6 fira-go text-sm bg-gray-100 rounded-t-md">
            <li className="flex space-x-6 py-6">
                <div className="flex flex-row gap-4 justify-center items-center">
                    <MapPin color={"#e84e3e"}/>
                    <h3 className="text-gray-900">{from}</h3>

                </div>
            </li>

            <div
                className="ml-2 pl-8 border-l-2 -my-4 border-dashed">
                {stopPlaceField.map((field, index: number) => (
                    <li key={index} className="py-4">
                        <h3 className="text-gray-500 text-xs">{field.name}</h3>
                    </li>
                ))}
            </div>

            <li className="flex space-x-6 py-6">
                <div className="flex flex-col justify-between space-y-4">
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <MapPin color={"#e84e3e"}/>
                        <h3 className="text-gray-900">{to}</h3>
                    </div>
                </div>
            </li>
        </ul>
    );
};

export default DirectionsInfo;
