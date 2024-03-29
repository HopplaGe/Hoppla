"use client"
import React, {useCallback} from "react";
import Map from "@/components/shared/maps/Map";
import {useTranslations} from "next-intl";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Libraries, useJsApiLoader} from "@react-google-maps/api";
import {Button, Input} from "@nextui-org/react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";

type pageProps = {
    searchParams?: { [key: string]: string | string[] | undefined };
}

const libraries = ["places"];
const OfferSeatsScheme = z.object({
    from: z.string(),
    to: z.string(),
});

const Departure = ({searchParams}: pageProps) => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as Libraries,
        language: "ka"
    });
    const t = useTranslations("OfferSeats.OfferSeatsForm");

    const router = useRouter();

    const [fromAddress, setFromAddress] = React.useState<string>(searchParams?.from as string);
    const [disabled, setDisabled] = React.useState<boolean>(true);

    const form = useForm<z.infer<typeof OfferSeatsScheme>>({
        resolver: zodResolver(OfferSeatsScheme),
        defaultValues: {
            from: fromAddress,
            to: searchParams?.to as string,
        }
    });

    const handleSubmit = useCallback(() => {
        const params = new URLSearchParams();
        params.set("from", fromAddress);
        params.set("to", form.getValues().to);
        params.set("seats", searchParams?.seats as string);

        router.push("/offer-seats/arrival?" + params.toString());
    }, [form, fromAddress, router, searchParams?.seats]);

    if (!isLoaded) return null;

    return (
        <div className="pt-8">
            <div
                className="px-0 lg:px-8 page-wrapper absolute bottom-0 lg:relative w-full max-w-5xl py-8 z-20 bg-white rounded-xl shadow-xl flex justify-center items-center sm:h-96 md:h-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}
                          className="w-full h-full flex flex-col gap-6 justify-center items-center">
                        <FormField
                            name="from"
                            render={({field}) => (
                                <FormItem className="w-full flex justify-center fira-go">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={t('From')}
                                            className="w-3/4"
                                            value={fromAddress}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button
                            color="primary"
                            size="lg"
                            className={cn("w-1/2 fira-go disabled:opacity-50", disabled ? "invisible" : "visible")}
                            disabled={disabled}
                            type="submit"
                        >
                            {t('Next')}
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="absolute h-4/5 lg:h-screen inset-0 w-full object-cover bg-blend-screen z-10">
                <div
                    className="w-full h-full">
                    <Map from={searchParams?.from as string} to={searchParams?.to as string}
                         setAddress={setFromAddress} setDisabled={setDisabled}/>
                </div>
            </div>
        </div>
    );
};

export default Departure;
