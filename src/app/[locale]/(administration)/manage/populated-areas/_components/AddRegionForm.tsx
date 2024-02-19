"use client";
import React, {useCallback, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import RegionSchema from '@/lib/validation/RegionScheme';
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {Autocomplete, AutocompleteItem, Button, Input, Switch} from '@nextui-org/react';
import {createRegion} from '@/lib/actions/regions';
import {useRouter} from 'next/navigation';
import {Region} from '@prisma/client';
import {cn} from '@/lib/utils';
import {getCountries} from '@/lib/actions/countries';

type AddRegionFormProps = {
    setOpen: (open: boolean) => void
}

const AddRegionForm = ({setOpen}: AddRegionFormProps) => {

    const router = useRouter();
    const [countries, setCountries] = useState<Region[]>([])

    useEffect(() => {
        getCountries().then((country) => {
            setCountries(country as any)
        })
    }, [])

    const form = useForm<z.infer<typeof RegionSchema>>({
        resolver: zodResolver(RegionSchema),
        defaultValues: {
            name: '',
            countryId: '',
            svgCoords: '',
            isOccupied: false
        }
    });
    const handleSubmit = useCallback(async (values: z.infer<typeof RegionSchema>) => {
        await createRegion(values as any);
        setOpen(false);
        router.refresh();
    }, [router, setOpen])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="mt-6 px-4 flex flex-col gap-4">
                    <FormField
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="text" label="რეგიონის სახელი"
                                           placeholder="მაგ: იმერეთი" {...field} />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="countryId"
                        render={({
                                     field: {
                                         onChange
                                     }
                                 }) => (
                            <FormItem>
                                <FormControl>
                                    <Autocomplete
                                        label="ქვეყანა"
                                        placeholder="მაგ: საქართველო"
                                        className="max-w-xs"
                                        defaultItems={countries}
                                        onSelectionChange={(item) => onChange(item)}
                                        selectedKey={countries.find((country) => country.id === form.watch('countryId'))?.id}
                                    >
                                        {(item) => (
                                            <AutocompleteItem className='w-full fira-go' key={item.id}>
                                                {item.name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="svgCoords"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="text" label="SVG კორდინატი"
                                           placeholder="მაგ: M307.27,170..." {...field} />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="isOccupied"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Switch
                                        {...field}
                                        classNames={{
                                            base: cn(
                                                "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                                                "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                                                "data-[selected=true]:border-primary",
                                            ),
                                            wrapper: "p-0 h-4 overflow-visible",
                                            thumb: cn("w-6 h-6 border-2 shadow-lg",
                                                "group-data-[hover=true]:border-primary",
                                                //selected
                                                "group-data-[selected=true]:ml-6",
                                                // pressed
                                                "group-data-[pressed=true]:w-7",
                                                "group-data-[selected]:group-data-[pressed]:ml-4",
                                            ),
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className="text-medium">ოკუპირებული</p>
                                        </div>
                                    </Switch>
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mt-6 px-4">
                    <Button
                        type='submit'
                        variant='solid'
                        size='lg'
                        color='secondary'
                        // onClick={() => setOpen(false)}
                        className='w-full'
                    >
                        დამატება
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default AddRegionForm