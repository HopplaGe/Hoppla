"use client"
import {Calendar} from '@/components/ui/calendar'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Button, Checkbox, Input, Popover, PopoverContent, PopoverTrigger, Link} from '@nextui-org/react'
import moment from 'moment'
import 'moment/locale/ka'
import {useLocale, useTranslations} from 'next-intl'
import ka from "date-fns/locale/ka";
import en from "date-fns/locale/en-US";
import React, {useCallback, useEffect} from 'react'
import {CalendarDays, Clock2} from 'lucide-react'
import {cn} from '@/lib/utils'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'next/navigation'
import {User} from '@prisma/client'
import OfferFinishSidebar from './OfferFinishSidebar'
import {createRide} from '@/lib/actions/rides'
import useDirections from '@/hooks/maps/useDirections'
import TimePicker from "@/components/shared/date-time/TimePicker";
import {RadioGroup} from "@headlessui/react";
import {useRideMutation} from "@/hooks/rides/useRideMutation";


const OfferFinishFormSchema = z.object({
    from: z.string(),
    to: z.string(),
    startDate: z.date(),
    startTime: z.string(),
    seats: z.number(),
    carId: z.string().optional(),
    driverId: z.string(),
    duration: z.number(),
    distance: z.number(),
    price: z.preprocess(
        (value) => {
            if (typeof value === 'string') {
                return parseFloat(value);
            }
            return value;
        },
        z.number()
    ),
    rideRules: z.any().optional()
})


type OfferFinishFormProps = {
    user: User | null;
    cars: any;
    searchParams: { [key: string]: string | undefined }
    rules: any
}

const OfferFinishForm = ({user, cars, searchParams, rules}: OfferFinishFormProps) => {

    const t = useTranslations("OfferSeats.FinishForm");

    const mutation = useRideMutation()

    const locale = useLocale()
    const router = useRouter()

    const {
        distance,
        duration,
        price
    } = useDirections(searchParams.from!, searchParams.to!, parseInt(searchParams.seats!))

    const form = useForm<z.infer<typeof OfferFinishFormSchema>>({
        resolver: zodResolver(OfferFinishFormSchema),
        defaultValues: {
            from: searchParams.from,
            to: searchParams.to,
            startDate: new Date(moment().utc().startOf('day').format('YYYY-MM-DDTHH:mm:ss')),
            startTime: "11:00",
            seats: parseInt(searchParams.seats!),
            carId: "",
            driverId: user?.id,
            duration: duration,
            distance: distance,
            // price: price / parseInt(searchParams.seats!),
            price: Number(price.toFixed(2)),
            rideRules: []
        }
    });

    useEffect(() => {
        form.setValue('distance', distance)
        form.setValue('duration', duration)
        form.setValue('price', Number(price.toFixed(2)))

    }, [distance, duration, price, form])

    const handleSubmit = (data: z.infer<typeof OfferFinishFormSchema>) => {
        mutation.mutate(data, {
            onSuccess: (ride) => {
                router.push(`/ride?id=${ride?.id}`)
            },
            onError: (error) => {
                console.error(error)
            }
        })
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 fira-go">
                    <div className='flex flex-col gap-4 col-span-1 lg:col-span-2 px-4 lg:px-0'>
                        <h3 className="text-sm text-secondary fira-go">{t("Price")}</h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-4">

                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem
                                        className="col-span-full text-3xl"
                                    >
                                        <Input
                                            endContent={<span className="text-xl text-gray-400">₾</span>}
                                            {...field}
                                            // {...form.register("price")}
                                            label={t("PriceLabel")}
                                            placeholder={t("PricePlaceholder")}
                                            required
                                            type="number"
                                            value={field.value.toString()}
                                            description={"მოცემულია რეკომენდირებული ფასი, თუმცა თქვენ შეგიძლიათ ჩაანაცვლოთ ის სასურველი ოდენობით."}
                                        />
                                        {form.formState.errors.price && (
                                            <span className="text-red-500">{form.formState.errors.price.message}</span>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                <h3 className="text-sm text-secondary fira-go col-span-full">{t("departureTimeTitle")}</h3>
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({field}) => (
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
                                                                <CalendarDays/>
                                                            </div>
                                                            <span className='text-md'>
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
                                    render={({field}) => (
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
                                                            <div
                                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                                                <Clock2/>
                                                            </div>
                                                            <span className='text-md'>{String(field.value)}</span>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[240px] fira-go p-0">
                                                    <TimePicker
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
                            </div>

                            <FormField
                                control={form.control}
                                name="rideRules"
                                render={() => (
                                    <FormItem className="flex flex-col gap-4">
                                        <div>
                                            <FormLabel className="text-sm font-bold fira-go">წესები</FormLabel>
                                            <FormDescription className="text-xs">
                                                თქვენს ავტომობილში დაშვებულია:
                                            </FormDescription>
                                        </div>
                                        {rules.map((rule: any, index: number) => (
                                            <FormField
                                                key={index}
                                                control={form.control}
                                                name="rideRules"
                                                render={({field}) => {
                                                    return (
                                                        <FormItem
                                                            key={index}
                                                            className="flex flex-row items-center space-x-2 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(rule.id)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            form.setValue("rideRules", [...field.value, rule.id])
                                                                        } else {
                                                                            form.setValue("rideRules", field.value.filter((id: string) => id !== rule.id))
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal flex flex-col">
                                                                {rule.name}
                                                                <small
                                                                    className="text-xs text-default-400">{rule.description}</small>
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="carId"
                                render={() => (
                                    <FormItem className="flex flex-col gap-4">
                                        <div>
                                            <FormLabel className="text-sm font-bold fira-go">ავტომობილი</FormLabel>
                                            <FormDescription className="text-xs">
                                                აირჩიეთ ავტომობილი <small
                                                className="text-default-400">(არასავალდებულო)</small>:
                                            </FormDescription>
                                        </div>
                                        <RadioGroup
                                            value={form.getValues("carId")}
                                            onChange={(value) => form.setValue("carId", value)}
                                            className="grid grid-cols-2 gap-4"
                                            defaultValue={
                                                cars.cars.length > 0 ? cars.cars[0].id : ""
                                            }
                                        >
                                            {cars.cars.length > 0 ? cars.cars.map((car: any, index: number) => (
                                                    <RadioGroup.Option
                                                        key={index}
                                                        value={car.id}
                                                        className={({active, checked}) =>
                                                            `${active ? 'ring-0 ring-offset-0 ring-primary' : ''}
                                                        ${checked ? 'bg-default-200 scale-95' : 'bg-default-100'} relative rounded-xl px-5 py-4 cursor-pointer focus:outline-none flex flex-col gap-2 justify-center items-center text-center`}
                                                    >
                                                        {({active, checked}) => (
                                                            <>
                                                            <span
                                                                className={cn("block truncate text-sm text-default-800", checked && "text-default-900 font-bold")}
                                                            >
                                                                {car.brand} {car.model}
                                                            </span>
                                                                <span
                                                                    className={cn("uppercase text-xs bg-default-200 px-2 py-0.5 rounded-md", checked && "bg-default-300")}>
                                                                {car.plateNumber}
                                                            </span>
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                ))
                                                : (
                                                    <div
                                                        className="col-span-2 flex flex-col gap-2 items-center bg-default-100 rounded-xl p-4">
                                                        <span className="text-sm">ავტომობილი არ მოიძებნა</span>
                                                        <p className="text-xs text-center">
                                                            ავტომობილის დამატება შეგიძლიათ თქვენი <Link
                                                            color="foreground"
                                                            size="sm"
                                                            underline="always"
                                                            target={"_blank"}
                                                            href={"/dashboard"}>პროფილიდან</Link>
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        </RadioGroup>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <OfferFinishSidebar
                        from={form.getValues("from")}
                        to={form.getValues("to")}
                        distance={distance}
                        duration={duration}
                        seats={form.getValues("seats")}
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