"use client"
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import moment, { duration } from 'moment'
import 'moment/locale/ka'
import { useLocale } from 'next-intl'
import ka from "date-fns/locale/ka";
import en from "date-fns/locale/en-US";
import React, { use, useCallback, useEffect, useState } from 'react'
import { CalendarDays, Clock2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import Time from '@/components/shared/date-time/TimePicker'
import { Console } from 'console'
import CarsInput from '@/components/inputs/CarsInput'
import { Car, Ride, User } from '@prisma/client'
import OfferFinishSidebar from './OfferFinishSidebar'
import prisma from '@/lib/prisma'
import { createRide } from '@/lib/actions/rides'
import useDirections from '@/hooks/maps/useDirections'

const OfferFinishFormSchema = z.object({
  from: z.string(),
  to: z.string(),
  startDate: z.date(),
  startTime: z.string(),
  seats: z.number(),
  carId: z.string(),
  driverId: z.string(),
  duration: z.number(),
  distance: z.number(),
  price: z.number(),
})


type OfferFinishFormProps = {
  user: User | null;
  cars: any;
  searchParams: { [key: string]: string | undefined }
}

const OfferFinishForm = ({ user, cars, searchParams }: OfferFinishFormProps) => {

  const locale = useLocale()
  const router = useRouter()

  const {distance, duration, price} = useDirections(searchParams.from!, searchParams.to!)

  const form = useForm<z.infer<typeof OfferFinishFormSchema>>({
    resolver: zodResolver(OfferFinishFormSchema),
    defaultValues: {
      from: searchParams.from,
      to: searchParams.to,
      startDate: new Date(),
      startTime: "11:00",
      seats: 0,
      carId: "",
      driverId: user?.id,
      duration: duration,
      distance: distance,
      // price: price / parseInt(searchParams.seats!),
      price: price / 4,
    }
  });

  useEffect(() => {
    form.setValue('distance', distance)
    form.setValue('duration', duration)
    form.setValue('price', price / 4)
  }, [distance, duration, price, form])

  const handleSubmit = async (values: z.infer<typeof OfferFinishFormSchema>) => {
    const res = await createRide(values as Ride)
    if (res) {
      router.push(`/carpool`)
    }
  };


  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 fira-go">
          <div className='flex flex-col gap-4 col-span-1 lg:col-span-2'>
          <h3 className="text-sm text-secondary fira-go">გასვლის დრო</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col h-14">
                    <Popover placement="bottom-end">
                      <PopoverTrigger>

                        <FormControl>
                          <Button
                            variant="light"
                            className={cn(
                              "relative w-full h-full border border-gray-100 bg-default-100 hover:bg-default-200 rounded-xl py-5 pl-10 text-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <div
                              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <CalendarDays />
                            </div>
                            <span className='text-lg'>
                              {field.value ? (
                                moment(field.value).locale(locale).calendar(
                                  null,
                                  locale === "ka" ? (
                                    {
                                      sameDay: '[დღეს]',
                                      nextDay: '[ხვალ]',
                                      nextWeek: 'LL',
                                      lastDay: '[გუშინ]',
                                      lastWeek: 'LL',
                                      sameElse: 'LL'
                                    }) : (
                                    {
                                      sameDay: '[Today]',
                                      nextDay: '[Tomorrow]',
                                      nextWeek: 'LL',
                                      lastDay: '[Yesterday]',
                                      lastWeek: 'LL',
                                      sameElse: 'LL'
                                    }
                                  )
                                )
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px] fira-go p-0">
                        <Calendar
                          locale={locale === "ka" ? ka : en}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            return moment(date).isBefore(moment().subtract(0, 'day'), 'day')
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col h-14">
                    <Popover placement="bottom-end">
                      <PopoverTrigger>

                        <FormControl>
                          <Button
                            variant="light"
                            className={cn(
                              "relative w-full h-full border border-gray-100 bg-default-100 hover:bg-default-200 rounded-xl py-5 pl-10 text-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6 text-xl",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <Clock2 />
                            </div>
                            <span className='text-lg'>{String(field.value)}</span>
                            {/* {moment(field.value).format("HH:mm") || "Pick a time"} */}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px] fira-go p-0">
                        <Time
                          locale={locale === "ka" ? ka : en}
                          mode="12h"
                          selectedTime={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />



              <FormField
                control={form.control}
                name="carId"
                render={({ field }) => (
                  <FormItem className='col-span-full'>
                    <CarsInput cars={cars.cars} onSelect={field.onChange} />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <OfferFinishSidebar
            from={form.getValues("from")}
            to={form.getValues("to")}
            distance={123456}
            duration={1234156}
            seats={1}
            stopPlaceField={[]}
          />
        </form>
      </Form>
    </>
  )
}

export default OfferFinishForm




// selected={field.value}
//               onSelect={field.onChange}