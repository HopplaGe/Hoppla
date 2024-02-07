"use client"
import React from "react";
import {PlacesInput} from "@/components/ui/places-input";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {
    GoogleMap,
    MarkerF,
    useJsApiLoader,
} from "@react-google-maps/api";

// "AIzaSyB-4LnrSUqFUTW0fR3w-WjRaDb4ISLIiQM"
type pageProps = {
    searchParams: {
        from: string;
        to: string;
    }
}

const data = [
    {
        name: "თბილისი",
        country: "საქართველო"
    },
    {
        name: "ბათუმი",
        country: "საქართველო"
    },
    {
        name: "ქუთაისი",
        country: "საქართველო"
    },
    {
        name: "ზუგდიდი",
        country: "საქართველო"
    },
    {
        name: "სამცხე-ჯავახეთი",
        country: "საქართველო"
    },
    {
        name: "რუსთავი",
        country: "საქართველო"
    },
    {
        name: "მცხეთა",
        country: "საქართველო"
    },
    {
        name: "სიღნაღი",
        country: "საქართველო"
    },
]

const OfferSeatsScheme = z.object({
    from: z.string(),
    to: z.string(),
});

const libraries = ["places"];


const Departure = ({searchParams}: pageProps) => {

    const form = useForm<z.infer<typeof OfferSeatsScheme>>({
        resolver: zodResolver(OfferSeatsScheme),
        defaultValues: {
            from: "",
            to: "",
        }
    });
    const handleSubmit = async (values: z.infer<typeof OfferSeatsScheme>) => {
        console.log(values);
    };


    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB-4LnrSUqFUTW0fR3w-WjRaDb4ISLIiQM",
        libraries: libraries as any
    });

    if (!isLoaded) {
        return null;
    }
    

    return (
        <div className="page-wrapper py-12 flex flex-col gap-16">
            <div className="w-80">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-6">
                        <FormField
                            name="from"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        {/*<PlacesInput*/}
                                        {/*    type="text"*/}
                                        {/*    placeholder="From"*/}
                                        {/*    label="საიდან"*/}
                                        {/*    defaultplace="თბილისი"*/}
                                        {/*    data={data}*/}
                                        {/*    {...field}/>*/}
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="to"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <PlacesInput
                                            type="text"
                                            placeholder="To"
                                            label="სად"
                                            defaultplace="ბათუმი"
                                            data={data}
                                            {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/*<PlacesInput type="text" placeholder="From" data={data}/>*/}
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Departure;
