"use client"
import React from 'react';
import {useForm} from "react-hook-form";
import * as z from "zod";
import {CarSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Autocomplete, AutocompleteItem, Button, Input, ModalFooter} from "@nextui-org/react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {cn} from "@/lib/utils";
import {RadioGroup} from '@headlessui/react'
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {createCar} from "@/lib/actions/cars";

const cars = [
    {
        brand: "Audi",
        models: [
            "A1",
            "A2",
            "A3",
            "A4",
            "A5",
            "A6",
            "A7",
            "A8"
        ]
    },
    {
        brand: "BMW",
        models: [
            "1 Series",
            "2 Series",
            "3 Series",
            "4 Series",
            "5 Series",
            "6 Series",
            "7 Series",
            "8 Series",
            "M3",
            "M4",
            "M5",
            "M6",
            "X1",
            "X2",
            "X3",
            "X4",
            "X5",
            "X6",
            "X7",
            "Z3",
            "Z4",
            "Z8",
        ]
    },
    {
        brand: "Mercedes-Benz",
        models: [
            "A-Class",
            "B-Class",
            "C-Class",
            "E-Class",
            "S-Class",
            "G-Class",
            "GLA-Class",
            "GLB-Class",
            "GLC-Class",
            "GLE-Class",
            "GLS-Class",
            "SL-Class",
            "SLK-Class",
            "SLR-Class",
            "SLS-Class",
            "V-Class",
            "Vaneo",
            "Viano",
            "Vito",
        ]
    },
    {
        brand: "Volkswagen",
        models: [
            "Arteon",
            "Atlas",
            "Beetle",
            "Bora",
            "Caddy",
            "Caravelle",
            "CC",
            "Corrado",
            "Crafter",
            "Eos",
            "Fox",
            "Golf",
            "Jetta",
            "Karmann Ghia",
            "Lupo",
            "Multivan",
            "Passat",
            "Phaeton",
            "Polo",
            "Scirocco",
            "Sharan",
            "T-Cross",
            "T-Roc",
            "Tiguan",
            "Touareg",
            "Touran",
            "Transporter",
            "Up",
            "Vento",
        ]
    },
    {
        brand: "Porsche",
        models: [
            "718",
            "911",
            "918",
            "924",
            "928",
            "944",
            "968",
            "Boxster",
            "Carrera GT",
            "Cayenne",
            "Cayman",
            "Macan",
            "Panamera",
        ]
    },
]

const colors = [
    {
        name: 'White',
        bgColor: 'bg-white',
        selectedColor: 'ring-offset-white'
    },
    {
        name: 'Black',
        bgColor: 'bg-black',
        selectedColor: 'ring-offset-black'
    },
    {
        name: 'Gray',
        bgColor: 'bg-gray-500',
        selectedColor: 'ring-offset-gray-500'
    },
    {
        name: 'Red',
        bgColor: 'bg-red-500',
        selectedColor: 'ring-offset-red-500'
    },
    {
        name: 'Yellow',
        bgColor: 'bg-yellow-500',
        selectedColor: 'ring-offset-yellow-500'
    },
    {
        name: 'Green',
        bgColor: 'bg-green-500',
        selectedColor: 'ring-offset-green-500'
    },
    {
        name: 'Blue',
        bgColor: 'bg-blue-500',
        selectedColor: 'ring-offset-blue-500'
    },
    {
        name: 'Purple',
        bgColor: 'bg-purple-500',
        selectedColor: 'ring-offset-purple-500'
    },
]

const AddCarForm = ({...props}: {
    onClose: () => void;
}) => {
    const t = useTranslations('MyCars');
    const t2 = useTranslations('Actions');
    const router = useRouter()
    const [selectedBrand, setSelectedBrand] = React.useState(cars[0].brand as string | null);
    const {data: session} = useSession()

    const currentUser = session?.user?.email as string

    const form = useForm<z.infer<typeof CarSchema>>({
        resolver: zodResolver(CarSchema),
        defaultValues: {
            brand: "",
            model: "",
            year: "",
            color: "",
            plateNumber: ""
        }
    });
    const handleSubmit = async (values: z.infer<typeof CarSchema>) => {
        await createCar(values, currentUser);
        props.onClose();
        router.replace("/dashboard");
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-6">
                    <FormField
                        name="brand"
                        render={({field: {onChange}}) => (
                            <FormItem>
                                <FormControl>
                                    <Autocomplete
                                        label={t('VehicleBrand')}
                                        placeholder="აირჩიეთ მარკა"
                                        className="max-w-full fira-go"
                                        defaultItems={cars.map((car) => ({label: car.brand, value: car.brand}))}
                                        onSelectionChange={(item) => {
                                            setSelectedBrand(item ? item.toString() : null);
                                            onChange(item ? item.toString() : null);
                                        }}
                                    >
                                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="model"
                        render={({field: {onChange}}) => (
                            <FormItem>
                                <FormControl>
                                    <Autocomplete
                                        label={t('VehicleModel')}
                                        placeholder="აირჩიეთ მოდელი"
                                        className="max-w-full fira-go"
                                        defaultItems={selectedBrand ? cars.find((car) => car.brand === selectedBrand)?.models.map((model) => ({
                                            label: model,
                                            value: model
                                        })) : []}
                                        onSelectionChange={(item) => onChange(item ? item.toString() : null)}
                                    >
                                        {(item) => <AutocompleteItem
                                            key={item.value}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>

                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="year"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="number" label={t('VehicleYear')}
                                           placeholder="2024" {...field}/>
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="plateNumber"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="max-w-full fira-go" type="text" label={t('VehiclePlateNumber')}
                                           placeholder="TE-001-ST" {...field}/>
                                </FormControl>
                                <FormMessage className="fira-go text-[10px]"/>
                            </FormItem>
                        )}
                    />

                    <div>
                        <h2 className="text-sm font-medium text-gray-900 fira-go">{t('VehicleColor')}</h2>
                        <FormField
                            name="color"
                            render={({field: {onChange}}) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup onChange={onChange} className="mt-2">
                                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                            <div className="flex items-center space-x-3">
                                                {colors.map((color) => (
                                                    <RadioGroup.Option
                                                        key={color.name}
                                                        value={color.name}
                                                        className={({active, checked}) =>
                                                            cn(
                                                                color.selectedColor,
                                                                active && checked ? 'ring ring-offset-1' : '',
                                                                !active && checked ? 'ring-2' : '',
                                                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-md p-0.5 focus:outline-none'
                                                            )
                                                        }
                                                    >
                                                        <RadioGroup.Label as="span" className="sr-only">
                                                            {color.name}
                                                        </RadioGroup.Label>
                                                        <span
                                                            aria-hidden="true"
                                                            className={cn(
                                                                color.bgColor,
                                                                'h-6 w-6 rounded-md border border-black border-opacity-10'
                                                            )}
                                                        />
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage className="fira-go text-[10px]"/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <ModalFooter className="px-0">
                        <Button color="danger" variant="light" onPress={props.onClose} className="fira-go">
                            {t2('Cancel')}
                        </Button>
                        <Button color="primary" variant="solid" className="fira-go" type="submit">
                            {t2('Add')}
                        </Button>
                    </ModalFooter>

                </form>
            </Form>
        </>
    );
};

export default AddCarForm;
