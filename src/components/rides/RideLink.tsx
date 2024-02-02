import React from 'react';
import {getRideLinks} from "@/lib/actions/rides";
import Link from "next/link";
import moment from "moment";

const RideLink = async () => {

    // const rideLinks = await getRideLinks()
    //
    // if (rideLinks.length > 0) {
    //     return (
    //         <>
    //             {rideLinks?.slice(0, 6).map((ride: any, index: number) => (
    //                 <li key={index}>
    //                     <Link
    //                         href={`/search?from=${ride.rideFrom}&to=${ride.rideTo}&date=${moment(new Date()).format("YYYY-MM-DD")}&seats=1`}
    //                         className="text-sm leading-6 text-gray-600 hover:text-gray-900 fira-go">
    //                         {ride.rideName}
    //                     </Link>
    //                 </li>
    //             ))}
    //         </>
    //     );
    // }

    return (
        <>
            <li>
                <Link href="/search?from=თბილისი&to=ბათუმი&date=2024-01-22&seats=1"
                      className="text-sm leading-6 text-muted-foreground hover:text-gray-900 fira-go">
                    დღეს მარშრუტები არ არის
                </Link>
            </li>
        </>
    );
};

export default RideLink;
