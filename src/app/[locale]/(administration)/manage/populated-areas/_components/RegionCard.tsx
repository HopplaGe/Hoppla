"use client"
import {cn} from '@/lib/utils'
import React from 'react'
import Link from "next/link";
import {usePathname} from "next/navigation";

type RegionCardProps = {
    region: any
}

const RegionCard = ({region}: RegionCardProps) => {
    const pathName = usePathname()
    return (
        <Link
            href={`${pathName}/${region.id}`}
            className={
                cn(
                    'grid grid-cols-3 px-4 py-4 bg-white rounded-xl border border-default-100',
                    region.isOccupied && 'border-2 text-red-500 border-dashed',
                    "hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
                )}>
            <div className='col-span-2'>
                <h3 className='col-span-3 text-md'>{region.name}</h3>
                <div className='col-span-2 fira-go text-xs text-default-700'>{region.country.name}</div>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center text-default-700'>
                <span className='text-xl font-bold'>{region.populatedAreas.length}</span>
                <span className='text-xs text-center fira-go'>პუნქტი</span>
            </div>
        </Link>
    )
}

export default RegionCard