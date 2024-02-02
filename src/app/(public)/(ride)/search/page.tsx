import React, {Suspense} from 'react';
import SearchBox from "@/components/partials/SearchBox";
import {ISearchProps} from "@/interfaces/ISearchProps";
import {getRideByFromAndToAndDateAndSeats} from "@/lib/actions/rides";
import RideCard from "@/components/rides/RidesCard";
import RidesNotFound from "@/components/rides/RidesNotFound";
import FilterForm from "@/components/rides/forms/FilterForm";
import moment from 'moment';
import 'moment/locale/ka';
import CarTypesTab from "@/components/rides/CarTypesTab";

const Search = async ({searchParams}: ISearchProps) => {

    const rides = await getRideByFromAndToAndDateAndSeats(searchParams.from, searchParams.to, searchParams.date, Number(searchParams.seats), searchParams.sort);

    const date = moment(new Date(searchParams.date)).locale('ka').format('LL');

    return (
        <div className="page-wrapper pt-8">
            <SearchBox className="" type="carpool"/>

            <Suspense fallback={<div>Loading...</div>}>
                <div className="relative z-10">
                    <div className="max-w-full">
                        <div className="py-10 sm:py-8">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                <div className="lg:col-span-2 flex flex-col gap-2">
                                    <CarTypesTab ridesCount={rides?.length as number}/>
                                    <div
                                        className="flex flex-col gap-2 px-4 fira-go text-gray-500">

                                        <h3 className="font-bold text-xl text-secondary">{searchParams.from} → {searchParams.to}</h3>

                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex flex-col gap-2">
                                                <span>{date}</span>
                                                <span
                                                    className="text-xs">ხელმისაწვდომია {rides?.length} მგზავრობა</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="divide-y-0 divide-gray-50 text-sm leading-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Suspense fallback={<div>Loading...</div>}>
                                            {rides?.length ? rides.map((ride, index) => (
                                                // @ts-ignore
                                                <RideCard key={index}
                                                          {...ride}
                                                />
                                            )) : <RidesNotFound/>}
                                        </Suspense>
                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    <div className="flex flex-col gap-2 fira-go">
                                        <h2 className="font-bold text-xl text-secondary">დაალაგე</h2>
                                    </div>
                                    <div className="flex flex-col gap-2 fira-go">
                                        <FilterForm/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default Search;
