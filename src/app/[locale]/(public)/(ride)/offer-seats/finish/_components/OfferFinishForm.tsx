"use client"
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import moment from 'moment'
import 'moment/locale/ka'
import { useLocale } from 'next-intl'
import ka from "date-fns/locale/ka";
import en from "date-fns/locale/en-US";
import React, { useCallback } from 'react'
import { CalendarDays, Clock2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import Time from '@/components/shared/date-time/TimePicker'
import { Console } from 'console'

const OfferFinishFormSchema = z.object({
  startLocation: z.string(),
  endLocation: z.string(),
  startDate: z.date(),
  startTime: z.string(),
  seats: z.number(),
})


const OfferFinishForm = () => {

  const locale = useLocale()

  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof OfferFinishFormSchema>>({
    resolver: zodResolver(OfferFinishFormSchema),
    defaultValues: {
      startLocation: searchParams.get("from")!,
      endLocation: searchParams.get("to")!,
      startDate: searchParams.get("date") ? new Date(moment(searchParams.get("date")).format("YYYY-MM-DD")) : new Date(),
      startTime: searchParams.get("time") ? "11:00" : "11:00",
      seats: searchParams.get("seats") ? parseInt(searchParams.get("seats") as string) : 1,
    }
  });

  const handleSubmit = useCallback((values: z.infer<typeof OfferFinishFormSchema>) => {
    console.log(values)
  }, []);


  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-2 fira-go">
          <div className='flex flex-col gap-4'>
            <h3>
              გასვლის დრო
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full mb-4">
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



              {/* <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <Input type="time" label="საათი" placeholder='საათი' defaultValue='11:00' />
                  </FormItem>
                )}
              /> */}
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              შექმნა
            </Button>

          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col w-full md:w-1/2">
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="price" className="text-sm mb-1">Price per seat</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter price"
                  className="input"
                />
              </div>

              <div className="flex flex-col w-full mb-4">
                <label htmlFor="seats" className="text-sm mb-1">Number of seats</label>
                <input
                  type="number"
                  id="seats"
                  name="seats"
                  placeholder="Enter number of seats"
                  className="input"
                />
              </div>

              <div className="flex flex-col w-full mb-4">
                <label htmlFor="message" className="text-sm mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter message"
                  className="input"
                />
              </div>
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="date" className="text-sm mb-1">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="Enter date"
                  className="input"
                />
              </div>

              <div className="flex flex-col w-full mb-4">
                <label htmlFor="time" className="text-sm mb-1">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  placeholder="Enter time"
                  className="input"
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default OfferFinishForm




// selected={field.value}
//               onSelect={field.onChange}