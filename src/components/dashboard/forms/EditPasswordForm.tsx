"use client"
import React from 'react';
import {Form, FormControl, FormField, FormItem, FormMessage, FormLabel} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {ChangePasswordScheme} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import googleLogo from "@/assets/social/google.svg";
import facebookLogo from "@/assets/social/facebook.svg";
import githubLogo from "@/assets/social/github.svg";
import Image from "next/image";
import PasswordChangeInputGroup from "@/components/dashboard/inputs/PasswordChangeInputGroup";
import {Button} from "@/components/ui/button";
import {Check, Edit, X} from "lucide-react";
import {updateUserPassword} from "@/lib/actions/user";

const providers = [
    {
        provider: "google",
        icon: googleLogo
    },
    {
        provider: "facebook",
        icon: facebookLogo
    },
    {
        provider: "github",
        icon: githubLogo
    }
];

const EditPasswordForm = ({user, provider}: { user: any, provider: string }) => {

    const form = useForm<z.infer<typeof ChangePasswordScheme>>({
        resolver: zodResolver(ChangePasswordScheme),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    });

    const [editing, setEditing] = React.useState(false);

    const handleSubmit = async (values: z.infer<typeof ChangePasswordScheme>) => {
        await updateUserPassword(user?.id as string, values)
    }

    return (
        <div>
            <div className="space-y-4 divide-y divide-gray-100 border-b border-gray-200">
                <h2 className="text-base font-semibold leading-7 text-gray-900 mb-6">პაროლის შეცვლა</h2>
            </div>

            {provider === "credentials" ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}
                              className="text-sm leading-6 flex flex-col md:flex-row items-center mt-6">
                            <div className="flex flex-col md:flex-row items-center flex-grow gap-4 w-full">
                                <FormField
                                    name="newPassword"
                                    render={({field}) => (
                                        <FormItem className="flex-grow w-full">
                                            <div className="h-6"><FormLabel>პაროლი:</FormLabel></div>
                                            <FormControl>
                                                <PasswordChangeInputGroup
                                                    {...field}
                                                    type="password"
                                                    disabled={!editing}
                                                />
                                            </FormControl>
                                            <FormMessage className="fira-go text-[10px]"/>
                                        </FormItem>
                                    )}
                                />

                                {editing && (
                                    <FormField
                                        name="confirmPassword"
                                        render={({field}) => (
                                            <FormItem className="flex-grow w-full">
                                                <div className="h-6"><FormLabel>დაადასტურე პაროლი:</FormLabel></div>
                                                <FormControl>
                                                    <PasswordChangeInputGroup
                                                        {...field}
                                                        type="password"
                                                        disabled={!editing}
                                                    />
                                                </FormControl>
                                                <FormMessage className="fira-go text-[10px]"/>
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>

                            <div
                                className="pt-6 flex flex-shrink items-end lg:items-center gap-x-2 w-full lg:w-1/3 justify-end">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    type="button"
                                    className="flex gap-x-1 items-center disabled:invisible"
                                    onClick={() => setEditing(false)}
                                    disabled={!editing}
                                    //clear form
                                    onClickCapture={() => form.reset()}
                                >
                                    <X size={16}/>
                                </Button>
                                {editing ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="submit"
                                        className="flex gap-x-1 items-center"
                                        onClick={() => {
                                            form.handleSubmit(handleSubmit)
                                            setEditing(false)
                                            form.reset()
                                        }}
                                    >
                                        <Check size={16}/>
                                        <span>შენახვა</span>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        onClick={() => setEditing(true)}
                                        className="flex gap-x-1 items-center"
                                    >
                                        <Edit size={16}/>
                                        <span>რედაქტირება</span>
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                )
                :
                (
                    <div className="mt-4 space-y-4 divide-y divide-gray-100 text-sm leading-6">
                        <p className="text-gray-500 py-4 flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-0">
                            თქვენ ავტორიზბული ხართ
                            {providers.map((item) => (
                                <span key={item.provider}>
                                    {item.provider === provider && (
                                        <span
                                            className="items-center gap-2 inline-flex px-4 py-2 bg-secondary mx-2 rounded-md text-xs text-secondary-foreground">
                                            <Image src={item.icon} alt={provider} width={24} height={24}/>
                                            {item.provider}
                                        </span>
                                    )}
                                </span>
                            ))}
                            სერვისით, ამიტომ თქვენი პაროლის შეცვლა შეუძლებელია.
                        </p>
                    </div>
                )
            }
        </div>
    );
};

export default EditPasswordForm;
