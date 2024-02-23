"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useSession } from "next-auth/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { updateUser } from "@/lib/actions/users";
import { uploadImage } from "@/lib/actions/s3actions";
import { useToast } from "@/components/ui/use-toast";
import ImageUploader from "@/components/shared/ImageUploader";

export const userUpdateSchema = z.object({
    name: z.string().min(2).max(50),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    image: z.string(),
    address: z.string().min(2).max(50),
    phone: z.string().min(2).max(50),
    birthdate: z.date(),
});

type DashRidesProps = {
    params: {
        locale: string;
    };
};

const DashRides = ({ params }: DashRidesProps) => {
    const { toast } = useToast();

    const { data: session, update } = useSession();
    const user = session?.user;
    const form = useForm<z.infer<typeof userUpdateSchema>>({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            name: "",
            gender: "MALE",
            address: "",
            image: "",
            phone: "",
            birthdate: new Date(),
        },
    });
    const [submitting, setSubmitting] = useState(false);

    async function onSubmit(values: z.infer<typeof userUpdateSchema>) {
        setSubmitting(true);
        await updateUser(user?.id!, values);
        update({
            user: {
                ...values,
            },
        });
        toast({
            title: "წარმატებით შეიცვალა!",
            description: "",
        });
        setSubmitting(false);
    }

    useEffect(() => {
        if (user) {
            form.setValue("name", user.name || "");
            form.setValue("gender", user.gender || "MALE");
            form.setValue("image", user.image || "");
            form.setValue("address", user.address || "");
            form.setValue("phone", user.phone || "");
            form.setValue("birthdate", new Date(user.birthdate));
        }
    }, [user]);

    if (!user) {
        return null;
    }

    const daysAgo = moment().subtract(7, "days");
    const canChangeSettings = moment(user.updatedAt).isBefore(daysAgo);

    return (
        <Form {...form}>
            <h2 className="font-bold text-xl mb-4 fira-go">My Settings</h2>
            <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-8"
                role="alert"
            >
                <strong className="font-bold">Warning! </strong>
                <span className="block sm:inline">
                    You can change your settings only once in 7 days.
                </span>
            </div>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 fira-go"
            >
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <ImageUploader
                            onImageUploaded={(url) =>
                                form.setValue("image", url)
                            }
                            defaultImage={user.image || ""}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    isRequired
                                    label="Name"
                                    {...field}
                                    placeholder="Enter your name..."
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    isRequired
                                    label="Address"
                                    placeholder="Enter your address..."
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    isRequired
                                    label="Phone"
                                    placeholder="Enter your phone..."
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="date"
                                    isRequired
                                    label="Date of Birth"
                                    placeholder="Enter your phone..."
                                    value={moment(field.value).format(
                                        "YYYY-MM-DD"
                                    )}
                                    onChange={(e) => {
                                        field.onChange({
                                            target: {
                                                value: new Date(
                                                    moment(
                                                        e.target.value
                                                    ).format("YYYY-MM-DD")
                                                ),
                                            },
                                        });
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select
                                    isRequired
                                    label="Gender"
                                    placeholder=""
                                    onChange={field.onChange}
                                    value={"MALE"}
                                    selectedKeys={[field.value]}
                                    className="max-w-xs"
                                >
                                    {["MALE", "FEMALE", "OTHER"].map(
                                        (gender) => (
                                            <SelectItem
                                                key={gender}
                                                value={gender}
                                            >
                                                {gender}
                                            </SelectItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    isDisabled={submitting || !canChangeSettings}
                    color="primary"
                    variant="solid"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default DashRides;
