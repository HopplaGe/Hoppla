"use client"
import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "@nextui-org/react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {useFormatter, useTranslations} from "next-intl";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {PlacesInput} from "@/components/ui/places-input";
import useDirections from "@/hooks/maps/useDirections";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Libraries, useJsApiLoader} from "@react-google-maps/api";

const OfferSeatsScheme = z.object({
    from: z.string(),
    to: z.string(),
});

const libraries = ["places"];

const OfferSeatsForm = () => {
    const t = useTranslations("OfferSeats.OfferSeatsForm");
    const t2 = useTranslations("Cities");

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as Libraries
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname()

    const [fromState, setFromState] = React.useState("");
    const [toState, setToState] = React.useState("");
    const [directionsQuery, setDirectionsQuery] = React.useState({from: "", to: ""});

    const {price} = useDirections(fromState, toState);

    const form = useForm<z.infer<typeof OfferSeatsScheme>>({
        resolver: zodResolver(OfferSeatsScheme),
        defaultValues: {
            from: t('Tbilisi'),
            to: t2('Batumi'),
        }
    });

    useEffect(() => {
        setDirectionsQuery({from: fromState, to: toState})
    }, [fromState, toState]);

    const createQueryStrings = useCallback((name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]);

    const handleSubmit = async (values: any) => {
        const querys = {
            from: createQueryStrings("from", values.from),
            to: createQueryStrings("to", values.to),
        }

        router.push(pathname + "/departure" + "?" + querys.from + "&" + querys.to);
    };

    if (!isLoaded) return null;

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
                                    price: price.toFixed(2),
                                    priceBox: (chunks) => <span
                                        className="text-primary text-xl font-semibold">{chunks}</span>
                                }
                            )}
                        </span>
                        <Button
                            type="submit"
                            variant="solid"
                            color="secondary"
                            size="lg"
                            className="w-full"
                        >
                            {t("PublishARide")}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default OfferSeatsForm;
