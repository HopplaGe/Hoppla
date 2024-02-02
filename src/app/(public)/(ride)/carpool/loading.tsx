import React from 'react';
import {getRides} from "@/lib/actions/rides";
import RidesLoadingCard from "@/components/rides/RidesLoadingCard";

const Loading = async () => {
    // const rides = await getRides();
    return (
        <div className="relative isolate z-10">

            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="py-10 sm:py-16 lg:py-20">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                {/*{*/}
                                {/*    rides && rides.map((ride, index) => (*/}
                                {/*        <>*/}
                                {/*            test*/}
                                {/*        </>*/}
                                {/*        // <RidesLoadingCard key={index}/>*/}
                                {/*    ))*/}
                                {/*}*/}
                            </div>
                            <div className="lg:col-span-1">
                                ...
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Loading;
