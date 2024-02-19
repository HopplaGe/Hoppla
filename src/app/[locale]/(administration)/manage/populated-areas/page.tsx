"use client"
import React, {FC, Suspense, useCallback, useEffect, useState} from 'react'
import PageHeading from './_components/PageHeading'
import * as region from '@/lib/actions/regions';
import Regions from './_components/Regions';
import {Region} from '@prisma/client';
import {getCountry} from '@/lib/actions/countries';

type pageProps = {}

const PopulatedAreas = () => {

    const [countryId, setCountryId] = useState<string>('clsrda0sc0000j6z873ebw7wv');
    const [country, setCountry] = useState<any>({});

    const fetchCountry = useCallback(async () => {
        const country = await getCountry(countryId);
        setCountry(country);
    }, [countryId]);

    useEffect(() => {
        fetchCountry().then(r => r);
    }, [fetchCountry]);

    return (
        <div className="w-full max-w-full grow lg:flex xl:px-2">

            <div className="flex-1 xl:flex">

                <div className="w-full px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 h-screen flex flex-col gap-4 md:gap-8">
                    <PageHeading setCountryId={setCountryId} regions={country?.regions as any[]}/>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Regions regions={country?.regions as Region[]}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default PopulatedAreas