import {getRideById} from '@/lib/actions/rides/get'
import "moment/locale/ka"
import React, {FC, Suspense} from 'react'
import RideDetails from './_components/RideDetails'
import {Ride} from '@prisma/client'
import RideDetailHead from './_components/RideDetailHead'
import {Metadata, ResolvingMetadata} from "next";

type pageProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    {params, searchParams}: pageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const ride = await getRideById(searchParams.id as string) as Ride

    return {
        title: ride.from + " - " + ride.to + " | Hoppla.ge - Ride with us",
        description: "Hoppla არის საუკეთესო საშუალება მგზავრობისთვის. გამოიყენე ჩვენი სერვისი და გაემგზავრე იმ ადგილებში, სადაც გსურთ. ჩვენ გთავაზობთ სასიამოვნო და ბიუჯეტურ მგზავრობას.",
    }
}

const page: FC<pageProps> = async ({searchParams}) => {

    const {id} = searchParams
    const ride = await getRideById(id as string) as Ride

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