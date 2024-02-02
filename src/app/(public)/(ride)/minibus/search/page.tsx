import React, {Suspense} from 'react';
import SearchBox from "@/components/partials/SearchBox";

interface ISearchProps {
    searchParams: {
        from: string | undefined;
        to: string;
        date: string;
        seats: number;
    }
}

const Search = ({searchParams}: ISearchProps) => {
    return (
        <div className="page-wrapper">
            <SearchBox className="" type=""/>

            <Suspense fallback={<div>Loading...</div>}>
                {/*<SearchResults searchParams={searchParams}/>*/}
                <div className="relative z-10">
                    <div className="max-w-full">
                        <div className="py-10 sm:py-8">
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                <div className="lg:col-span-2 flex flex-col gap-2">
                                    {/*<RideList/>*/}

                                    <span>საძიებო შედეგები</span>
                                    <span>{searchParams.from} - {searchParams.to}</span>
                                    <span>{searchParams.date}</span>
                                    <span>{searchParams.seats} ადგილი</span>
                                </div>
                                <div className="lg:col-span-1">
                                    {/*<RideCalendarFilter/>*/}
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
