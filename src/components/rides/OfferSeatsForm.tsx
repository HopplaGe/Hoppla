"use client"
import React, {useEffect, useState} from 'react';
import {Button} from "@nextui-org/react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {useFormatter, useTranslations} from "next-intl";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {PlacesInput} from "@/components/ui/places-input";
import {meterToKm} from "@/lib/tools/meterToKm";
import {result} from "lodash";
import {secondsToHours} from "@/lib/tools/secondsToHours";
import {calculatePrice} from "@/lib/tools/calculatePrice";

const OfferSeatsScheme = z.object({
    from: z.string(),
    to: z.string(),
});


const variants = {
    open: {opacity: 1, x: 0},
    closed: {opacity: 0, x: "-100%"},
}

const OfferSeatsForm = () => {
    const t = useTranslations("OfferSeats.OfferSeatsForm");
    const t2 = useTranslations("Cities");
    const format = useFormatter();
    const [fromState, setFromState] = React.useState("");
    const [toState, setToState] = React.useState("");
    const [price, setPrice] = React.useState(0);

    const form = useForm<z.infer<typeof OfferSeatsScheme>>({
        resolver: zodResolver(OfferSeatsScheme),
        defaultValues: {
            from: t('Tbilisi'),
            to: t2('Batumi'),
        }
    });
    const handleSubmit = async (values: any) => {
        // console.log("value", values);
    };

    const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult>(
        {
            geocoded_waypoints: [],
            routes: [],
        }
    )

    useEffect(() => {
        if (fromState && toState) {
            const directionsService = new google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: fromState,
                    destination: toState,
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirectionResponse(result as google.maps.DirectionsResult);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
            setPrice(calculatePrice(distance, duration))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromState, toState])

    // console.log("directionResponse", directionResponse);

    const distance = directionResponse?.routes[0]?.legs[0]?.distance?.value as number
    const duration = directionResponse?.routes[0]?.legs[0]?.duration?.value as number

    const startLatLng = directionResponse?.routes[0]?.legs[0]?.start_location.lat() + "," + directionResponse?.routes[0]?.legs[0]?.start_location.lng()
    const endLatLng = directionResponse?.routes[0]?.legs[0]?.end_location.lat() + "," + directionResponse?.routes[0]?.legs[0]?.end_location.lng()

    // console.log("startLatLng", startLatLng);
    // console.log("endLatLng", endLatLng);
    // console.log("distance", distance);
    // console.log("duration", duration);

    const calcPrice = calculatePrice(distance, duration) / 4

    // console.log("price", calcPrice);

    // console.log("pppp", format.);

    return (
        <div className="bg-white p-4 rounded-xl fira-go flex flex-col gap-4 justify-center">
            <h2 className="text-xl font-bold">{t("title")}</h2>
            <div className="flex flex-col gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-6">
                        <FormField
                            name="from"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <PlacesInput
                                            type="text"
                                            placeholder={t("FromPlaceholder")}
                                            label={t("From")}
                                            defaultplace="თბილისი"
                                            state={setFromState}
                                            {...field}
                                        />
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
                                            placeholder={t("ToPlaceholder")}
                                            label={t("To")}
                                            defaultplace="ბათუმი"
                                            state={setToState}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <span className="block text-lg w-full text-center">
                            {t.rich('SaveMoney', {
                                    price: calcPrice.toFixed(2),
                                    priceBox: (chunks) => <span
                                        className="text-primary text-xl font-semibold">{chunks}</span>
                                }
                            )}
                        </span>
                        <Button type="submit" variant="solid" color="secondary" size="lg"
                                className="w-full">{t("PublishARide")}</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default OfferSeatsForm;
