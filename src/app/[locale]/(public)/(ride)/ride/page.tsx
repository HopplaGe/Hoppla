import {getRideById} from '@/lib/actions/rides/get'
import "moment/locale/ka"
import React, {FC, Suspense} from 'react'
import RideDetails from './_components/RideDetails'
import {Ride} from '@prisma/client'
import RideDetailHead from './_components/RideDetailHead'

type pageProps = {
    searchParams: any
}

const page: FC<pageProps> = async ({searchParams}) => {

    const {id} = searchParams

    const ride = await getRideById(id) as Ride

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='page-wrapper py-6 md:py-10 text-default-700 flex flex-col gap-4 md:gap-8'>
                <RideDetailHead startDate={ride.startDate}/>

                <div className='flex flex-col justify-center items-center w-full gap-4'>
                    <RideDetails ride={ride} searchParams={searchParams}/>
                </div>
            </div>
        </Suspense>
    )
}

export default page