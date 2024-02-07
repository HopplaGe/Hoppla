import React, {Suspense} from 'react';
import SearchBox from "@/components/partials/SearchBox";
import RidesResultList from "@/components/rides/RidesResultList";

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

const Search = ({searchParams}: pageProps) => {

    return (
        <>
            <div className="page-wrapper">
                <SearchBox className="my-8"/>
                <div className="pb-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="">
                        <div className="bg-white p-4 rounded-xl ">
                            <h2 className="text-2xl font-bold">Filter</h2>
                            <div className="mt-4">
                                <h3 className="text-lg font-bold">Transport Type</h3>
                                <div className="mt-2">
                                    <input type="checkbox" id="car" name="car" value="car"/>
                                    <label htmlFor="car"> Car</label><br/>
                                    <input type="checkbox" id="bus" name="bus" value="bus"/>
                                    <label htmlFor="bus"> Bus</label><br/>
                                    <input type="checkbox" id="train" name="train" value="train"/>
                                    <label htmlFor="train"> Train</label><br/>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-bold">Sort</h3>
                                <div className="mt-2">
                                    <input type="radio" id="price" name="price" value="price"/>
                                    <label htmlFor="price"> Price</label><br/>
                                    <input type="radio" id="time" name="time" value="time"/>
                                    <label htmlFor="time"> Time</label><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <Suspense fallback={<div>Loading...</div>}>
                            <RidesResultList searchParams={searchParams}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
