"use client"
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form'
import AreaSchema from '@/lib/validation/AreasScheme'
import React, {useCallback, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Autocomplete, AutocompleteItem, Button, Input, Switch} from '@nextui-org/react';
import {PopulatedAreaStatus, Region} from '@prisma/client';
import {getRegions} from '@/lib/actions/regions'
import {useRouter} from 'next/navigation'
import {createArea} from '@/lib/actions/populated-areas'
import {cn} from '@/lib/utils'

type AddAreaFormProps = {
    setOpen: (open: boolean) => void
}

const populationAreaStatus = [
    {name: 'ქალაქი', value: PopulatedAreaStatus.CITY},
    {name: 'დაბა', value: PopulatedAreaStatus.TOWNSHIP},
    {name: 'სოფელი', value: PopulatedAreaStatus.VILLAGE},
]


const AddAreaForm = ({setOpen}: AddAreaFormProps) => {

    const router = useRouter();
    const [regions, setRegions] = useState<Region[]>([])

    useEffect(() => {
        getRegions().then((regions) => {
            setRegions(regions)
        })
    }, [])

    const form = useForm<z.infer<typeof AreaSchema>>({
        resolver: zodResolver(AreaSchema),
        defaultValues: {
            name: '',
            lat: parseFloat('0'),
            lng: parseFloat('0'),
            symbol: '',
            status: PopulatedAreaStatus.CITY,
            postalCode: '',
            population: 0,
            isCapital: false,
            regionId: ''
        }
    });
    const handleSubmit = useCallback(async (values: z.infer<typeof AreaSchema>) => {
        await createArea(values as any);
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
                                    <Input className="max-w-full fira-go" type="text" label="დასახლებული პუნქტი"
                                           placeholder="მაგ: ქუთაისი" {...field} />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4">
                        <FormField
                            name="lat"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="max-w-full fira-go" type="number" label="განედი"
                                               placeholder="მაგ: 42.2459636" {...field} />
                                    </FormControl>
                                    <FormMessage className="fira-go text-[10px]"/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lng"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="max-w-full fira-go" type="number" label="გრძედი"
                                               placeholder="მაგ: 42.6269399" {...field} />
                                    </FormControl>
                                    <FormMessage className="fira-go text-[10px]"/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="status"
                        render={({
                                     field: {
                                         onChange,
                                     }
                                 }) => (
                            <FormItem>
                                <FormControl>
                                    <Autocomplete
                                        label="პუნქტის სტატუსი"
                                        placeholder="მაგ: ქალაქი"
                                        className="max-w-xs"
                                        defaultItems={populationAreaStatus}
                                        onSelectionChange={(item) => onChange(item)}
                                        selectedKey={form.watch('status')}
                                    >

                                        {(item) => <AutocompleteItem className='w-full fira-go'
                                                                     key={item.value}>{item.name}</AutocompleteItem>}
                                    </Autocomplete>
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="regionId"
                        render={({
                                     field: {
                                         onChange,
                                     }
                                 }) => (
                            <FormItem>
                                <FormControl>
                                    <Autocomplete
                                        label="რეგიონი"
                                        placeholder="მაგ: იმერეთი"
                                        className="max-w-xs"
                                        defaultItems={regions}
                                        onSelectionChange={(item) => onChange(item)}
                                        selectedKey={regions.find((region) => region.id === form.watch('regionId'))?.id}
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
                        name="postalCode"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="text" label="საფოსტო ინდექსი"
                                           placeholder="მაგ: 4600" {...field} />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="population"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="text" label="მოსახლეობა"
                                           placeholder="მაგ: 147,500" {...field} />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="isCapital"
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
                                            <p className="text-medium">დედაქალაქი</p>
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

export default AddAreaForm