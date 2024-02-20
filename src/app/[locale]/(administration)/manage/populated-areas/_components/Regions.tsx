"use client";
import { Region } from '@prisma/client';
import React from 'react'
import RegionCard from './RegionCard';


type RegionsProps = {
    regions: Region[]
}

const Regions = ({ regions }: RegionsProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>რეგიონები</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2'>
                {regions?.map((region: Region, index: number) => (
                    <RegionCard key={index} region={region} />
                ))}
            </div>
        </div>
    )
}

export default Regions