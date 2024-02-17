"use client"
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import moment from 'moment'
import React from 'react'

const RideDetailHead = (startDate: any) => {
  return (
    <div className="flex flex-row mx-auto w-1/2 max-w-7xl relative justify-center items-center">
          <Button
            size="sm"
            variant="back"
            onClick={() => window.history.back()}
            // startContent={<ChevronLeft size={44}/>}
            className='absolute left-10 top-1'
          >
            <ChevronLeft size={44}/>
          </Button>
          <h1 className='text-4xl text-center fira-go'>
            {moment(startDate).locale('ka').format('LL').slice(0, -5)}
          </h1>
        </div>
  )
}

export default RideDetailHead