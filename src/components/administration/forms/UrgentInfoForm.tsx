"use client"
import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePathname, useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Button, Input, Textarea} from "@nextui-org/react";
import {UrgentInfo} from "@prisma/client";
import {createUrgentInfo, getUrgentInfo, removeUrgentInfo} from '@/lib/actions/infos';
import {X} from "lucide-react";

const UrgentInfoSchema = z.object({
    title: z.string().min(3, {
        message: "სათაური უნდა იყოს 3 სიმბოლოზე მეტი"
    }),
    content: z.string().min(10, {
        message: "აღწერა უნდა იყოს 10 სიმბოლოზე მეტი"
    }),
    color: z.string()
});

const UrgentInfoForm = () => {
    const router = useRouter()
    const pathName = usePathname()

    const [info, setInfo] = useState<UrgentInfo | null>(null)

    const form = useForm<z.infer<typeof UrgentInfoSchema>>({
        resolver: zodResolver(UrgentInfoSchema),
        defaultValues: {
            title: "",
            content: "",
            color: ""
        }
    });

    const getUrgentInfoFn = useCallback(async () => {

        const infoData = await getUrgentInfo()

        if (infoData) {
            setInfo(infoData[0])
        }

    }, [])

    useEffect(() => {
        getUrgentInfoFn().then(r => r)
    }, [getUrgentInfoFn])


    const removeInfo = useCallback(async (id: string) => {
        await removeUrgentInfo(id)
        setInfo(null)
    }, [])


    const handleSubmit = useCallback(async (values: z.infer<typeof UrgentInfoSchema>) => {
        const res = await createUrgentInfo(values as UrgentInfo)
        if (res) {
            router.replace(pathName)
        }
    }, [pathName, router])

    // console.log(info)

    return (
        <div className="w-full flex flex-col gap-2 items-start bg-white p-4 rounded-xl">
            <h2>
                სასწრაფო ინფორმაცია
            </h2>
            {!info ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}
                          className="w-full space-y-6 fira-go">
                        <FormField
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            label={"სათაური"}
                                            placeholder="მაგ: საიტის რეჟიმი"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="fira-go text-[10px]"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="content"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            label="აღწერა"
                                            placeholder="მაგ: საიტი მუშაობს სატესტო რეჟიმში"
                                            className="max-w-ფულლ"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="fira-go text-[10px]"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="color"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="color"
                                            label="ფერი"
                                            placeholder={"ფერი"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="fira-go text-[10px]"/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="fira-go"
                                size="lg"
                                color="secondary"
                            >
                                შენახვა
                            </Button>
                        </div>
                    </form>
                </Form>
            ) : (
                <div
                    className="w-full flex flex-col gap-2 justify-start items-start py-4 px-4 rounded-xl text-white fira-go relative"
                    style={{backgroundColor: info.color as string}}>
                    <h4>
                        {info.title}
                    </h4>
                    <p>
                        {info.content}
                    </p>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                         onClick={() => removeInfo(info?.id)}>
                        <X size={20}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrgentInfoForm;
