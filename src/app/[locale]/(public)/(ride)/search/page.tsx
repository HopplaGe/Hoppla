import React, {FC} from 'react';
import SearchBox from "@/components/partials/SearchBox";
import {useTranslations} from "next-intl";

interface pageProps {
    searchParams: {
        from: string | undefined;
        to: string;
        date: string;
        seats: number;
        sort?: string;
        filter?: string;
    }
}

const Search = ({searchParams}: pageProps) => {

    return (
        <>
            <div className="page-wrapper">
                <SearchBox className="my-8"/>
                <div className="pb-8">
                    <h1>Search Page</h1>
                    <p>From: {searchParams.from}</p>
                    <p>To: {searchParams.to}</p>
                    <p>Date: {searchParams.date}</p>
                    <p>Seats: {searchParams.seats}</p>
                    
                </div>
            </div>
        </>
    );
};

export default Search;
