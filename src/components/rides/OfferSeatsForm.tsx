"use client"
import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "@nextui-org/react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {useTranslations} from "next-intl";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {PlacesInput} from "@/components/ui/places-input";
import useDirections from "@/hooks/maps/useDirections";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Libraries, useJsApiLoader} from "@react-google-maps/api";
import {cn} from '@/lib/utils';
import NumberSelector from '../ui/number-selector';
import {User} from 'lucide-react';
import {Label} from '../ui/label';

const OfferSeatsScheme = z.object({
    from: z.string(),
    to: z.string(),
    seats: z.number().min(1),
});

const libraries = ["places"];

const OfferSeatsForm = () => {
    const t = useTranslations("OfferSeats.OfferSeatsForm");
    const t2 = useTranslations("Cities");

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as Libraries,
        language: "ka"
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname()

    const [fromState, setFromState] = React.useState("");
    const [toState, setToState] = React.useState("");
    const [seatState, setSeatState] = React.useState<number>(1);
    // const [directionsQuery, setDirectionsQuery] = React.useState({ from: "", to: "", seats: 1 });


    const form = useForm<z.infer<typeof OfferSeatsScheme>>({
        resolver: zodResolver(OfferSeatsScheme),
        defaultValues: {
            from: t('Tbilisi'),
            to: t2('Batumi'),
            seats: 1,
        }
    });

    const {price} = useDirections(fromState, toState, seatState);

    useEffect(() => {
        setFromState(form.getValues("from"))
        setToState(form.getValues("to"))
        setSeatState(form.getValues("seats"))
    }, [form])

    // useEffect(() => {
    //     // setDirectionsQuery({ from: form.getValues("from"), to: form.getValues("to"), seats: form.getValues("seats") })
    // }, [fromState, toState]);

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
            seats: createQueryStrings("seats", values.seats),
        }

        router.push(pathname + "/departure" + "?" + querys.from + "&" + querys.to + "&" + querys.seats);
    };

    const [device, setDevice] = useState<"mobile" | "desktop" | "tablet">("desktop");

    const isMobile = useCallback(() => {
        if (typeof window === "undefined") return false;
        setDevice(window.innerWidth < 1023 ? "mobile" : "desktop");
    }, []);

    useEffect(() => {
        isMobile();
        window.addEventListener("resize", isMobile);
        return () => window.removeEventListener("resize", isMobile);
    }, [isMobile]);

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

                        <FormField
                            name="seats"
                            render={({field}) => (
                                <FormItem>
                                    <Popover placement={device === "desktop" ? "right-start" : "bottom-start"}>
                                        <PopoverTrigger>
                                            <FormControl>
                                                <div
                                                    className="relative w-full h-full border border-gray-100 md:border-l-0 bg-default-100 rounded-xl p-2 flex flex-col ">
                                                    <Label className='text-xs'>{t("Seats")}</Label>
                                                    <div
                                                        className={cn(
                                                            " text-black placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-pointer flex flex-row items-center gap-2",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <User size={12}/>
                                                        {field.value ? field.value : <span>1</span>} მგზავრი
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <FormControl>
                                                <NumberSelector type="hidden" state={setSeatState} {...field} />
                                            </FormControl>
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />


                        <span className="block text-lg w-full text-center">
                            {t.rich('SaveMoney', {
                                    price: (price * seatState).toFixed(2),
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
