"use client"
import {useEffect, useState} from 'react';
import {Clock, Route} from "lucide-react";
import SeatSelector from "@/components/rides/buttons/SeatSelector";
import {IRideAddForm} from "@/interfaces/IRideAddForm";
import Link from "next/link";
import RideAddInput from "@/components/rides/inputs/RideAddInput";
import AddRideFormClear from "@/components/rides/buttons/AddRideFormClear";
import {convertSeconds} from "@/lib/tools/convertSeconds";
import {Button} from "@/components/ui/button";

const RideAddForm = ({
                         from,
                         to,
                         calculateDistance,
                         distance,
                         duration,
                         setPrice,
                         setSeats,
                         seats,
                         price,
                         directionResponse
                     }: IRideAddForm
) => {

    const [disable, setDisable] = useState(true)
    const [tripQuery, setTripQuery] = useState({})
    const [distanceQuery, setDistanceQuery] = useState<number>(0)
    const [durationQuery, setDurationQuery] = useState<number>(0)


    useEffect(() => {
        if (directionResponse && from?.current?.value && to?.current?.value) {
            setTripQuery(
                {
                    from: from?.current?.value,
                    to: to?.current?.value,
                    distance: distance,
                    duration: duration,
                    price: price,
                    seats: seats
                }
            )
            setDistanceQuery(distance)
            setDurationQuery(duration)
        }
    }, [to, directionResponse, distance, duration, from, seats, price])

    return (
        <>
            <dl className="flex flex-col gap-4 relative">
                <div
                    className="flex lg:hidden items-center gap-6 fira-go w-full text-gray-600 text-xs lg:text-base">
                        <span className="flex items-center gap-2">
                            <Route width={18} height={18}/>

                            მანძილი: {!distanceQuery ? "0 კმ" : `${distanceQuery} კმ`}
                        </span>
                    <span className="flex items-center gap-2">
                            <Clock width={18} height={18}/>

                            დრო: {!durationQuery ? "0:00" : convertSeconds(durationQuery)}
                        </span>

                </div>

                <div className="flex flex-col gap-4 relative">
                    <RideAddInput
                        inputRef={from}
                        from={from}
                        to={to}
                        placeholder="საიდან"
                        name="origin"
                        setDisable={setDisable}
                        setSeats={setSeats}
                        distance={distance}
                        duration={duration}
                    />


                    <AddRideFormClear from={from} to={to} disable={disable} setDisable={setDisable}
                                      setPrice={setPrice} setDistanceQuery={setDistanceQuery}
                                      setDurationQuery={setDurationQuery}
                                      setSeats={setSeats}/>

                    <RideAddInput
                        inputRef={to}
                        from={from}
                        to={to}
                        placeholder="სად"
                        name="destination"
                        setDisable={setDisable}
                        setSeats={setSeats}
                        distance={distance}
                        duration={duration}
                    />
                </div>


                <div className=" w-full rounded-md flex flex-col lg:flex-row gap-4">
                    {distanceQuery !== 0 && <SeatSelector setSeats={setSeats} seats={seats} disabled={disable}/>}

                    {!distanceQuery && <Button
                        className={`bg-primary hover:bg-primaryDark h-12 lg:h-16 rounded-md border-0 px-24 py-0.5 text-white fira-go flex justify-center items-center`}
                        disabled={disable}
                        onClick={() => {
                            if (!from?.current?.value || !to?.current?.value) return
                            to?.current?.value && calculateDistance()
                        }}>
                        მარშრუტის გამოთვლა
                    </Button>}

                    {distanceQuery !== 0 && <Link
                        href={{
                            pathname: "/ride/add/confirm",
                            query: tripQuery
                        }}
                        className={`bg-secondary hover:bg-secondaryDark h-12 lg:h-16 rounded-md border-0 px-24 py-0.5 text-white fira-go flex justify-center items-center`}
                        aria-disabled={disable}
                    >
                        შემდეგი
                    </Link>}
                </div>


            </dl>

            <div className="hidden mt-6 lg:flex items-center gap-6 fira-go w-full text-gray-600 text-xs lg:text-base">
                <span className="flex items-center gap-2">
                    <Route width={18} height={18}/>

                    მანძილი: {!distanceQuery ? "0 კმ" : `${distanceQuery} კმ`}
                </span>
                <span className="flex items-center gap-2">
                    <Clock width={18} height={18}/>

                    დრო: {!durationQuery ? "00:00" : convertSeconds(durationQuery)} სთ
                </span>

            </div>
        </>
    );
};

export default RideAddForm;
