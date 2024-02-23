import React, {Suspense} from 'react';
import SearchBox from "@/components/partials/SearchBox";
import RidesResultList from "@/components/rides/RidesResultList";
import {getRideByFromAndToAndDateAndSeats} from '@/lib/actions/rides';
import CarTypesTab from "./_components/CarTypesTab";
import Filter from "./_components/Filter";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate
} from "@tanstack/react-query";

interface pageProps {
    searchParams: {
        from: string | undefined;
        to: string;
        date: string;
        seats: number;
        transport_type?: string;
        sort?: string;
        filter?: string;
    }
}

const Search = async ({searchParams}: pageProps) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['rides', searchParams],
        queryFn: () => getRideByFromAndToAndDateAndSeats(searchParams),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="page-wrapper">
                <SearchBox className="my-8"/>
                <div className="pb-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <Filter/>
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <CarTypesTab transport_type={searchParams.transport_type as string}/>
                        <Suspense fallback={<div>Loading...</div>}>
                            <RidesResultList searchParams={searchParams}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    );
};

export default Search;