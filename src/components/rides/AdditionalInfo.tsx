import React from 'react';
import {convertSeconds} from "@/lib/tools/convertSeconds";

interface IAdditionalInfo {
    distance: number,
    duration: number,
    seats: number,
}

const AdditionalInfo = ({
                            distance,
                            duration,
                            seats,
                        }: IAdditionalInfo) => {
    return (

        <dl className=" space-y-6 text-sm font-medium text-gray-500 fira-go">
            <div className="flex justify-between items-center">
                <dt>მანძილი</dt>
                <dd className="text-gray-900">{distance + " კმ"}</dd>
            </div>
            <div className="flex justify-between items-center">
                <dt className="flex items-center">
                    დრო
                    <small
                        className="hidden lg:block ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] tracking-wide text-gray-500">დანიშნულების
                        ადგილამდე</small>
                </dt>
                <dd className="text-gray-900">{convertSeconds(duration)}</dd>
            </div>
            <div className="flex justify-between items-center">
                <dt>მგზავრები</dt>
                <dd className="text-gray-900">{seats}</dd>
            </div>
        </dl>
    );
};

export default AdditionalInfo;
