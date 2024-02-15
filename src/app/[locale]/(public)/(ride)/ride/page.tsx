import { getRideById } from '@/lib/actions/rides'
import moment from 'moment'
import "moment/locale/ka"
import React, { FC, Suspense } from 'react'
import RideDetails from './_components/RideDetails'
import { Ride } from '@prisma/client'
import useDirections from '@/hooks/maps/useDirections'
import { getUserById } from '@/lib/actions/users'
import { Button } from '@nextui-org/react'
import RideDetailHead from './_components/RideDetailHead'

type pageProps = {
  searchParams: any
}

const page: FC<pageProps> = async ({ searchParams }) => {

  const { id } = searchParams

  const ride = await getRideById(id) as Ride
  const driver = await getUserById(ride?.driverId)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='page-wrapper py-10 text-default-700 flex flex-col gap-8'>
        <RideDetailHead startDate={ride.startDate} />

        <div className='flex flex-col justify-center items-center w-full gap-8'>
          <RideDetails ride={ride} searchParams={searchParams} driver={driver} />

        </div>
      </div>
    </Suspense>
  )
}

export default page