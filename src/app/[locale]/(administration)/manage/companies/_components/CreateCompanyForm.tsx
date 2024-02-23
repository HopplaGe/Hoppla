"use client"
import React from 'react';
import {useCompanyMutation} from "@/hooks/companies/useCompanyMutation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Button, CircularProgress, Input, Textarea} from "@nextui-org/react";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast"; // Import the UseMutationHook type

const CompanyScheme = z.object({
    name: z.string(),
    description: z.string()
});

const CreateCompanyForm = () => {
    const mutation = useCompanyMutation();
    const {toast} = useToast()

    const form = useForm<z.infer<typeof CompanyScheme>>({
        resolver: zodResolver(CompanyScheme),
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const handleSubmit = (data: z.infer<typeof CompanyScheme>) => {
        mutation.mutate(data, {
            onSuccess: () => {
                form.reset();
                toast({
                    variant: "default",
                    title: "კომპანია დაემატა",
                    description: "კომპანია ეარმატებით დაემატა",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            },
            onError: (error) => {
                console.error(error);
            }
        });

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-6">
                <FormField
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="fira-go"
                                    placeholder={"მაგ: ჰოპლა"}
                                    type="text"
                                    autoComplete="off"
                                    label={"სახელი"}
                                />
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className="fira-go"
                                    placeholder={"მაგ: კომპანია სატრანსპორტო სერვისებისთვის"}
                                    type="text"
                                    autoComplete="off"
                                    label={"აღწერა"}
                                />
                            </FormControl>
                            <FormMessage className="fira-go text-[10px]"/>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="fira-go"
                    color="primary"
                    size="lg"
                    variant="solid"
                    disabled={mutation.isPending}
                    startContent={mutation.isPending ? <CircularProgress
                        aria-label="Loading..."
                        size="lg"
                        value={
                            mutation.isPending ? 0 : undefined
                        }
                        color="warning"
                        showValueLabel={true}
                    /> : undefined}
                >
                    დამატება
                </Button>

            </form>
        </Form>
    );
};

export default CreateCompanyForm;
