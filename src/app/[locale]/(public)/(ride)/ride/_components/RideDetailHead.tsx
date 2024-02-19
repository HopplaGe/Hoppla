"use client"
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import moment from 'moment'
import "moment/locale/ka"
import { useLocale } from 'next-intl'
import React from 'react'

const RideDetailHead = (startDate: any) => {
  const locale = useLocale()
  return (
    <div className="flex flex-row mx-auto w-full lg:w-1/2 max-w-7xl relative justify-center items-center -translate-x-8">
          <Button
            size="sm"
            variant="back"
            onClick={() => window.history.back()}
            // startContent={<ChevronLeft size={44}/>}
        // className='absolute left-10 top-1'
          >
        <ChevronLeft className='w-8 h-8 md:w-10 md:h-10' />
          </Button>
      <h1 className='text-2xl md:text-4xl text-center fira-go'>
            {moment(startDate).locale(locale).format('LL').slice(0, -5)}
          </h1>
        </div>
  )
}

export default RideDetailHead