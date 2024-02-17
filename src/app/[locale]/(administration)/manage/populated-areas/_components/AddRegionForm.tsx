import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RegionSchema from '@/lib/validation/RegionScheme';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button, Input } from '@nextui-org/react';

type AddRegionFormProps = {
    setOpen: (open: boolean) => void
}

const AddRegionForm = ({ setOpen }: AddRegionFormProps) => {

    const form = useForm<z.infer<typeof RegionSchema>>({
        resolver: zodResolver(RegionSchema),
        defaultValues: {
            name: '',
            country: '',
        }
    });
    const handleSubmit = useCallback(async (values: z.infer<typeof RegionSchema>) => {
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
                                    <Input className="max-w-full fira-go" type="text" label="რეგიონის სახელი" placeholder="მაგ: იმერეთი" {...field} />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="text" label="ქვეყანა" placeholder="მაგ: საქართველო" {...field} />
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

export default AddRegionForm