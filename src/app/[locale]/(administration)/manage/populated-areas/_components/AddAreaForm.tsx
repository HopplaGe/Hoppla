import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import AreaSchema from '@/lib/validation/AreasScheme'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react';
import { PopulatedAreaStatus } from '@prisma/client';

type AddAreaFormProps = {
    setOpen: (open: boolean) => void
}

const populationAreaStatus = [
    { name: 'ქალაქი', value: PopulatedAreaStatus.CITY },
    { name: 'დაბა', value: PopulatedAreaStatus.TOWNSHIP },
    { name: 'სოფელი', value: PopulatedAreaStatus.VILLAGE },
]


const AddAreaForm = ({ setOpen }: AddAreaFormProps) => {

    const form = useForm<z.infer<typeof AreaSchema>>({
        resolver: zodResolver(AreaSchema),
        defaultValues: {
            name: '',
            lat: "",
            lng: "",
            symbol: '',
            status: PopulatedAreaStatus.CITY,
            postalCode: '',
            population: '',
            region: ''
        }
    });
    const handleSubmit = useCallback(async (values: z.infer<typeof AreaSchema>) => {

        console.log(values);
        // props.onClose();
        // router.replace("/dashboard");
    }, [])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="mt-6 px-4 flex flex-col gap-4">
                    <FormField
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="text" label="დასახლებული პუნქტი" placeholder="მაგ: ქუთაისი" {...field} />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]" />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4">
                        <FormField
                            name="lat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="max-w-full fira-go" type="text" label="განედი" placeholder="მაგ: 42.2459636" {...field} />
                                    </FormControl>
                                    <FormMessage className="fira-go text-[10px]" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lng"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="max-w-full fira-go" type="text" label="გრძედი" placeholder="მაგ: 42.6269399" {...field} />
                                    </FormControl>
                                    <FormMessage className="fira-go text-[10px]" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="status"
                        render={({ field: {
                            onChange,
                            onBlur,
                        } }) => (
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

                                        {(item) => <AutocompleteItem className='w-full fira-go' key={item.value}>{item.name}</AutocompleteItem>}
                                    </Autocomplete>
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="text" label="საფოსტო ინდექსი" placeholder="მაგ: 4600" {...field} />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="population"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="text" label="მოსახლეობა" placeholder="მაგ: 147,500" {...field} />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]" />
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