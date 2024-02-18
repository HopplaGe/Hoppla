"use client";
import { cn } from '@/lib/utils';
import { Region } from '@prisma/client';
import React from 'react'
import Image from 'next/image'
import RegionCard from './RegionCard';


type RegionsProps = {
    regions: Region[]
}

const Regions = ({ regions }: RegionsProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-xl'>რეგიონები</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                {regions?.map((region: Region, index: number) => (
                    <RegionCard key={index} region={region} />
                ))}
            </div>
        </div>
    )
}

export default Regions