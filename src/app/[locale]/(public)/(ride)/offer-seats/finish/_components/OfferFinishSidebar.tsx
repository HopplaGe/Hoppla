import { MapPin } from 'lucide-react'
import React from 'react'
import secondsToHours from 'date-fns/secondsToHours'
import { Button } from '@nextui-org/react'

type OfferFinishFormProps = {
    from: string,
    to: string,
    distance: number,
    duration: number,
    seats: number,
    stopPlaceField:
    {
        name: string
    }[]
}

const OfferFinishSidebar = ({ from,
    to,
    distance,
    duration,
    seats,
    stopPlaceField
}: OfferFinishFormProps) => {
    return (
        <div aria-labelledby="summary-heading" className="col-span-1 w-full lg:max-w-md flex-col lg:flex">
            <ul role="list" className="overflow-y-auto px-6 fira-go text-sm bg-gray-100 rounded-t-xl">
                <li className="flex space-x-6 py-6">
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <MapPin color={"#e84e3e"} />
                        <h3 className="text-gray-900">{from}</h3>

                    </div>
                </li>

                <div
                    className="ml-2 pl-8 border-l-2 -my-4 border-dashed">
                    {/* {stopPlaceField.map((field, index: number) => (
                    <li key={index} className="py-4">
                        <h3 className="text-gray-500 text-xs">{field.name}</h3>
                    </li>
                ))} */}
                </div>

                <li className="flex space-x-6 py-6">
                    <div className="flex flex-col justify-between space-y-4">
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <MapPin color={"#e84e3e"} />
                            <h3 className="text-gray-900">{to}</h3>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-200 p-6 rounded-b-xl">
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
                        <dd className="text-gray-900">{secondsToHours(duration)}</dd>
                    </div>
                    <div className="flex justify-between items-center">
                        <dt>მგზავრები</dt>
                        <dd className="text-gray-900">{seats}</dd>
                    </div>
                    <Button
                        variant="solid"
                        color="secondary"
                        size='lg'
                        type="submit"
                        className="w-full"
                    >
                        მგზავრობის გამოქვეყნება
                    </Button>
                </dl>
            </div>
        </div>
    )
}

export default OfferFinishSidebar