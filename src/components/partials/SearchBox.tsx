"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SearchSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
// import {Input} from "@/components/ui/input";
import { CalendarDays, Locate, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import NumberSelector from "@/components/ui/number-selector";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import moment from "moment";
import "moment/locale/ka";
import ka from "date-fns/locale/ka";
import en from "date-fns/locale/en-US";
import { useTranslations } from "next-intl";
import { Autocomplete, Libraries, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

const SearchBox = ({ className }: { className?: string }) => {
  const params = useParams();
  const t = useTranslations("SearchForm");
  const t2 = useTranslations("Cities");

  const [disabled, setDisabled] = React.useState<boolean>(true);

  const [fromResult, setFromResult] = useState<google.maps.places.Autocomplete | null>(null);
  const [toResult, setToResult] = useState<google.maps.places.Autocomplete | null>(null);
    const [seatState, setSeatState] = React.useState<number>(1);


  const searchParams = useSearchParams();

  const router = useRouter();

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      startLocation: searchParams.get("from") || t2("Tbilisi"),
      endLocation: searchParams.get("to") || t2("Batumi"),
      startDate: searchParams.get("date")
        ? new Date(moment(searchParams.get("date")).format("YYYY-MM-DD"))
        : new Date(),
      seats: searchParams.get("seats")
        ? parseInt(searchParams.get("seats") as string)
        : 1,
    },
  });

  const createQueryStr = useCallback(
    (values: z.infer<typeof SearchSchema>) => {
      const query = new URLSearchParams(searchParams);
      query.set("from", values.startLocation);
      query.set("to", values.endLocation);
      query.set("date", moment(values.startDate).format("YYYY-MM-DD"));
      query.set("seats", values.seats.toString());
      query.set("transport_type", "carpool");
      return query.toString();
    },
    [searchParams]
  );

  const handleSubmit = useCallback(
    (values: z.infer<typeof SearchSchema>) => {
      //${type}/search?${createQueryStr(values)}
      router.push(`/search?${createQueryStr(values)}`);
    },
    [router, createQueryStr]
  );

  useEffect(() => {
    if (!form.getValues().endLocation) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as Libraries,
    language: "ka"
  });

  if (!isLoaded) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(
          className,
          "rounded-xl grid grid-cols-1 lg:grid-cols-12 lg:justify-between items-center w-full fira-go bg-white overflow-hidden"
        )}
      >
        <FormField
          name="startLocation"
          render={({ field }) => (
            <FormItem className="relative w-full col-span-12 lg:col-span-3">
              <FormControl>
                <Autocomplete
                  onPlaceChanged={() => {
                    if (fromResult != null) {
                      const place = fromResult.getPlace();

                      const formattedAddress = place.formatted_address;

                      field.onChange({ target: { value: formattedAddress } });
                    }
                  }}
                  onLoad={(autocomplete) => {
                    setFromResult(autocomplete)
                  }}
                >
                  <Input
                    isClearable
                    radius="none"
                    size="lg"
                    startContent={<Locate />}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      if (!e.target.value) {
                        setDisabled(true);
                      } else {
                        setDisabled(false);
                      }
                    }}
                    placeholder={t(`From`)}
                    type="text"
                    classNames={{
                      label: "text-black/50 dark:text-white/90",
                      input: [
                        "bg-transparent text-sm",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        "ml-2",
                        "outline-none",
                      ],
                      innerWrapper: "bg-transparent",
                      inputWrapper: ["bg-white text-black"],
                    }}
                    onClear={() => {
                      field.onChange({ target: { value: "" } });
                    }}
                  />
                </Autocomplete>
              </FormControl>
              <FormMessage className="fira-go text-[10px]" />
            </FormItem>
          )}
        />
        <FormField
          name="endLocation"
          render={({ field }) => (
            <FormItem className="relative w-full col-span-12 lg:col-span-3">
              <FormControl>
                <Autocomplete
                  onPlaceChanged={() => {
                    if (toResult != null) {
                      const place = toResult.getPlace();

                      const formattedAddress = place.formatted_address;

                      field.onChange({ target: { value: formattedAddress } });
                    }
                  }}
                  onLoad={(autocomplete) => {
                    setToResult(autocomplete)
                  }}
                >
                  <Input
                    isClearable
                    radius="none"
                    size="lg"
                    startContent={<Locate />}
                    {...field}
                    placeholder={t(`To`)}
                    onChange={(e) => {
                      field.onChange(e);
                      if (!e.target.value) {
                        setDisabled(true);
                      } else {
                        setDisabled(false);
                      }
                    }}
                    type="text"
                    classNames={{
                      label: "text-black",
                      input: [
                        "bg-transparent text-sm",
                        "text-black",
                        "placeholder:text-gray-400",
                        "ml-2",
                        "outline-none",
                      ],
                      innerWrapper: "bg-transparent text-black",
                      inputWrapper: ["bg-white text-black"],
                    }}
                    onClear={() => {
                      field.onChange({ target: { value: "" } });
                    }}
                  />
                </Autocomplete>
              </FormControl>
              <FormMessage className="fira-go text-[10px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col col-span-2 lg:col-span-2 h-16 bg-white">
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <FormControl>
                    <Button
                      variant="light"
                      className={cn(
                        "relative w-full h-full rounded-none border border-gray-100 md:border-l-0 bg-white py-5 pl-10 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                        <CalendarDays />
                      </div>
                      {field.value ? (
                        moment(field.value)
                          .locale(params.locale)
                          .calendar(
                            null,
                            params.locale === "ka"
                              ? {
                                sameDay: "[დღეს]",
                                nextDay: "[ხვალ]",
                                nextWeek: "LL",
                                lastDay: "[გუშინ]",
                                lastWeek: "LL",
                                sameElse: "LL",
                              }
                              : {
                                sameDay: "[Today]",
                                nextDay: "[Tomorrow]",
                                nextWeek: "LL",
                                lastDay: "[Yesterday]",
                                lastWeek: "LL",
                                sameElse: "LL",
                              }
                          )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] fira-go p-0 bg-white">
                  <Calendar
                    locale={params.locale === "ka" ? ka : en}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      return moment(date).isBefore(
                        moment().subtract(0, "day"),
                        "day"
                      );
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seats"
          render={({ field }: { field: any }) => (
            <FormItem className="flex flex-col col-span-6 lg:col-span-1 h-16">
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <FormControl>
                    <Button
                      variant="light"
                      className={cn(
                        "relative w-full h-full rounded-none border border-gray-100 md:border-l-0 bg-white py-5 pl-10 pr-5 mr-5 text-black placeholder:text-gray-400 sm:text-sm sm:leading-6",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                        <User />
                      </div>
                      {field.value ? field.value : <span>1</span>}
                    </Button>
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

        <Button
          variant="solid"
          color="secondary"
          size="lg"
          type="submit"
          className="col-span-12 lg:col-span-3 rounded-t-none lg:rounded-l-none lg:rounded-r-xl py-5 disabled:cursor-not-allowed disabled:opacity-85 h-full text-sm"
          onClick={() => {
            router.push(`/search?${createQueryStr(form.getValues())}`);
          }}
          disabled={disabled}
        >
          {t(`Search`)}
        </Button>
      </form>
    </Form>
  );
};

export default SearchBox;
