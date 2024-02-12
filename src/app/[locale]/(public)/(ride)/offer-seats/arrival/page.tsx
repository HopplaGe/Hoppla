"use client";
import React, { useCallback, useEffect } from "react";
import Map from "@/components/shared/maps/Map";
import { PlacesInput } from "@/components/ui/places-input";
import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { Button, Input } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type pageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const OfferSeatsScheme = z.object({
  from: z.string(),
  to: z.string(),
});

const libraries = ["places"];

const Arrival = ({ searchParams }: pageProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as Libraries,
  });
  const t = useTranslations("OfferSeats.OfferSeatsForm");

  const router = useRouter();
  const pathname = usePathname();

  const [toAddress, setToAddress] = React.useState<string>(
    searchParams?.to as string
  );
  const [disabled, setDisabled] = React.useState<boolean>(true);

  const form = useForm<z.infer<typeof OfferSeatsScheme>>({
    resolver: zodResolver(OfferSeatsScheme),
    defaultValues: {
      from: searchParams?.from as string,
      to: toAddress,
    },
  });

  const handleSubmit = () => {
    const params = new URLSearchParams();
    params.set("from", form.getValues().from);
    params.set("to", toAddress);

    router.push("/offer-seats/finish?" + params.toString());
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col w-full h-screen lg:flex-row gap-4">
      <div className="w-full lg:w-1/2 h-1/6 lg:h-screen z-20 flex">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full h-full flex flex-col gap-6 justify-center items-center"
          >
            <FormField
              name="to"
              render={({ field }) => (
                <FormItem className="w-full flex justify-center">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("to")}
                      className="w-1/2"
                      value={toAddress}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              color="primary"
              size="lg"
              className={cn(
                "w-1/2 fira-go disabled:opacity-50",
                disabled ? "invisible" : "visible"
              )}
              disabled={disabled}
              type="submit"
            >
              {t("Next")}
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-full lg:w-1/2 h-4/5 lg:h-screen">
        <div className="w-full h-full">
          <Map
            from={searchParams?.to as string}
            to={searchParams?.from as string}
            setAddress={setToAddress}
            setDisabled={setDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Arrival;