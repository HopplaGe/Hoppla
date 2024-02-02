"use client"
import React from 'react';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {UserSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import EditableInput from "@/components/dashboard/inputs/EditableInput";
import {updateUser} from "@/lib/actions/user";
import Image from "next/image";

const EditProfileForm = ({user}: { user: any }) => {

    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            address: user?.address,
        }
    });

    const handleSubmit = async (values: z.infer<typeof UserSchema>) => {
        await updateUser(user?.id, values);
    }

    return (
        <div>
            <div className="max-w-4xl mx-auto mt-6 lg:mt-0">
                <div className="flex items-center space-x-5">
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <Image className="h-16 w-16 rounded-md"
                                   src={user?.image}
                                   alt=""
                                   width={64}
                                   height={64}
                            />
                            <span className="absolute inset-0 shadow-inner rounded-md"
                                  aria-hidden="true"/>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {user?.name}
                        </h3>
                        <p className="text-sm leading-5 text-gray-500">
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}
                      className="mt-6 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <FormField
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <EditableInput
                                        label="სახელი"
                                        {...field}
                                        placeholder={"სახელი გვარი"}
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <EditableInput
                                        label="ელ.ფოსტა"
                                        {...field}
                                        placeholder={"johndoe@hoppla.ge"}
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="phone"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <EditableInput
                                        label="ტელეფონი"
                                        {...field}
                                        placeholder={"577123456"}
                                        type="tel"
                                    />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="address"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <EditableInput
                                        label="მისამართი"
                                        {...field}
                                        placeholder={"მაგ: თბილისი, ვაჟა-ფშაველას გამზირი"}
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                </form>
            </Form>
        </div>
    );
};

export default EditProfileForm;
