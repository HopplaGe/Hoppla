import React from 'react';
import {getRideLinks} from "@/lib/actions/rides";
import moment from "moment/moment";
import Link from "next/link";

const DailyRides = async () => {
        const rides = await getRideLinks()

        if (!rides) {
            return <div>loading...</div>
        }

        if (rides.length === 0) {
            return <div className="py-8 fira-go">დღეს მარშრუტები არ არის</div>
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                {rides?.slice(0, 4).map((ride: any, index: number) => (
                    <Link key={index}
                          type="button"
                          href={`/search?from=${ride.rideFrom}&to=${ride.rideTo}&date=${moment(new Date()).format("YYYY-MM-DD")}&seats=1`}
                          className="bg-white rounded-xl border border-gray-100 hover:shadow-2xl fira-go py-4"
                    >
                        <div className="flex flex-col justify-center items-center py-8">
                            <div className="flex items-center">

                                <div className="text-lg font-semibold">{ride.rideName}</div>
                            </div>
                            <div className="text-gray-400 text-sm">
                                {ride.rideCount} მარშუტი
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }
;

export default DailyRides;
