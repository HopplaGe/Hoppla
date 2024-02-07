"use client"
import React from 'react';
import {Button} from "@nextui-org/react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {useTranslations} from "next-intl";
import {z} from "zod";
import {PlacesInput} from "@/components/ui/places-input";
import {zodResolver} from "@hookform/resolvers/zod";

const data = [
    {
        "name": "ჟინვალი",
        "country": "საქართველო"
    },
    {
        "name": "რუსლანი",
        "country": "საქართველო"
    },
    {
        "name": "აბასთუმანი",
        "country": "საქართველო"
    },
    {
        "name": "მუხრანი",
        "country": "საქართველო"
    },
    {
        "name": "ვაზისუბანი",
        "country": "საქართველო"
    },
    {
        "name": "ხარაგაული",
        "country": "საქართველო"
    },
    {
        "name": "ჭიათურა",
        "country": "საქართველო"
    },
    {
        "name": "მარნეული",
        "country": "საქართველო"
    },
    {
        "name": "თელავი",
        "country": "საქართველო"
    },
    {
        "name": "საგურამო",
        "country": "საქართველო"
    },
    {
        "name": "სიღნაღი",
        "country": "საქართველო"
    },
    {
        "name": "ხაშური",
        "country": "საქართველო"
    },
    {
        "name": "წყალტუბო",
        "country": "საქართველო"
    },
    {
        "name": "ჯავა",
        "country": "საქართველო"
    },
    {
        "name": "ქედა",
        "country": "საქართველო"
    },
    {
        "name": "ზესტაფონი",
        "country": "საქართველო"
    },
    {
        "name": "მარტვილი",
        "country": "საქართველო"
    },
    {
        "name": "ცაგერი",
        "country": "საქართველო"
    },
    {
        "name": "შეკვეთილი",
        "country": "საქართველო"
    },
    {
        "name": "გუდაუთა",
        "country": "საქართველო"
    },
    {
        "name": "წაღვერი",
        "country": "საქართველო"
    },
    {
        "name": "ყვარელი",
        "country": "საქართველო"
    },
    {
        "name": "ახმეტა",
        "country": "საქართველო"
    },
    {
        "name": "ცხვარიჭამია",
        "country": "საქართველო"
    },
    {
        "name": "ოზურგეთი",
        "country": "საქართველო"
    },
    {
        "name": "ქსანი",
        "country": "საქართველო"
    },
    {
        "name": "ბულაჩაური",
        "country": "საქართველო"
    },
    {
        "name": "ხონი",
        "country": "საქართველო"
    },
    {
        "name": "თბილისი",
        "country": "საქართველო"
    },
    {
        "name": "ჩოხატაური",
        "country": "საქართველო"
    },
    {
        "name": "ჩაქვი",
        "country": "საქართველო"
    },
    {
        "name": "კასპი",
        "country": "საქართველო"
    },
    {
        "name": "წიწამური",
        "country": "საქართველო"
    },
    {
        "name": "ასპინძა",
        "country": "საქართველო"
    },
    {
        "name": "ბათუმი",
        "country": "საქართველო"
    },
    {
        "name": "გუდაური",
        "country": "საქართველო"
    },
    {
        "name": "სურამი",
        "country": "საქართველო"
    },
    {
        "name": "მისაქციელი",
        "country": "საქართველო"
    },
    {
        "name": "მცხეთა",
        "country": "საქართველო"
    },
    {
        "name": "ხობი",
        "country": "საქართველო"
    },
    {
        "name": "გაგრა",
        "country": "საქართველო"
    },
    {
        "name": "წნორი",
        "country": "საქართველო"
    },
    {
        "name": "ანანური",
        "country": "საქართველო"
    },
    {
        "name": "სოხუმი",
        "country": "საქართველო"
    },
    {
        "name": "ნიჩბისი",
        "country": "საქართველო"
    },
    {
        "name": "გორი",
        "country": "საქართველო"
    },
    {
        "name": "შატილი",
        "country": "საქართველო"
    },
    {
        "name": "ახალგორი",
        "country": "საქართველო"
    },
    {
        "name": "ახალციხე",
        "country": "საქართველო"
    },
    {
        "name": "წალენჯიხა",
        "country": "საქართველო"
    },
    {
        "name": "მარტყოფი",
        "country": "საქართველო"
    },
    {
        "name": "სარფი",
        "country": "საქართველო"
    },
    {
        "name": "ნატანები",
        "country": "საქართველო"
    },
    {
        "name": "ტყვარჩელი",
        "country": "საქართველო"
    },
    {
        "name": "იგოეთი",
        "country": "საქართველო"
    },
    {
        "name": "ონი",
        "country": "საქართველო"
    },
    {
        "name": "ქარელი",
        "country": "საქართველო"
    },
    {
        "name": "ბახმარო",
        "country": "საქართველო"
    },
    {
        "name": "ანაკლია",
        "country": "საქართველო"
    },
    {
        "name": "ბოლნისი",
        "country": "საქართველო"
    },
    {
        "name": "ხელვაჩაური",
        "country": "საქართველო"
    },
    {
        "name": "ადიგენი",
        "country": "საქართველო"
    },
    {
        "name": "სუფსა",
        "country": "საქართველო"
    },
    {
        "name": "წალკა",
        "country": "საქართველო"
    },
    {
        "name": "ქობულეთი",
        "country": "საქართველო"
    },
    {
        "name": "დმანისი",
        "country": "საქართველო"
    },
    {
        "name": "ხულო",
        "country": "საქართველო"
    },
    {
        "name": "წეროვანი",
        "country": "საქართველო"
    },
    {
        "name": "მესტია",
        "country": "საქართველო"
    },
    {
        "name": "დუშეთი",
        "country": "საქართველო"
    },
    {
        "name": "კარდენახი",
        "country": "საქართველო"
    },
    {
        "name": "სენაკი",
        "country": "საქართველო"
    },
    {
        "name": "კვარიათი",
        "country": "საქართველო"
    },
    {
        "name": "რუსთავი",
        "country": "საქართველო"
    },
    {
        "name": "საგარეჯო",
        "country": "საქართველო"
    },
    {
        "name": "პანკისი",
        "country": "საქართველო"
    },
    {
        "name": "ლანჩხუთი",
        "country": "საქართველო"
    },
    {
        "name": "ოჩამჩირე",
        "country": "საქართველო"
    },
    {
        "name": "ტყიბული",
        "country": "საქართველო"
    },
    {
        "name": "მახინჯაური",
        "country": "საქართველო"
    },
    {
        "name": "საჩხერე",
        "country": "საქართველო"
    },
    {
        "name": "გარდაბანი",
        "country": "საქართველო"
    },
    {
        "name": "თერჯოლა",
        "country": "საქართველო"
    },
    {
        "name": "გონიო",
        "country": "საქართველო"
    },
    {
        "name": "ქუთაისი",
        "country": "საქართველო"
    },
    {
        "name": "ბაკურიანი",
        "country": "საქართველო"
    },
    {
        "name": "ურეკი",
        "country": "საქართველო"
    },
    {
        "name": "ციხისძირი",
        "country": "საქართველო"
    },
    {
        "name": "სიონი",
        "country": "საქართველო"
    },
    {
        "name": "გურჯაანი",
        "country": "საქართველო"
    },
    {
        "name": "შიომღვიმე",
        "country": "საქართველო"
    },
    {
        "name": "კოდორი",
        "country": "საქართველო"
    },
    {
        "name": "აგარა",
        "country": "საქართველო"
    },
    {
        "name": "მანგლისი",
        "country": "საქართველო"
    },
    {
        "name": "აბაშა",
        "country": "საქართველო"
    },
    {
        "name": "ნაფეტვრები",
        "country": "საქართველო"
    },
    {
        "name": "ცხინვალი",
        "country": "საქართველო"
    },
    {
        "name": "წოდორეთი",
        "country": "საქართველო"
    },
    {
        "name": "ვანი",
        "country": "საქართველო"
    },
    {
        "name": "ფასანაური",
        "country": "საქართველო"
    },
    {
        "name": "საირმე",
        "country": "საქართველო"
    }
]

const OfferSeatsScheme = z.object({
    from: z.string(),
    to: z.string(),
});


const OfferSeatsForm = () => {
    const t = useTranslations("OfferSeats.OfferSeatsForm");

    const form = useForm<z.infer<typeof OfferSeatsScheme>>({
        resolver: zodResolver(OfferSeatsScheme),
        defaultValues: {
            from: "",
            to: "",
        }
    });
    const handleSubmit = async (values: z.infer<typeof OfferSeatsScheme>) => {
        console.log(values);
    };

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
                                            data={data}
                                            {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="from"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <PlacesInput
                                            type="text"
                                            placeholder={t("ToPlaceholder")}
                                            label={t("To")}
                                            defaultplace="ბათუმი"
                                            data={data}
                                            {...field}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                {/*<Input label={t("From")} placeholder={t("FromPlaceholder")}/>*/}
                {/*<Input label={t("From")} placeholder={t("ToPlaceholder")}/>*/}
                <span className="text-lg w-full text-center">
                    {/*TODO: Add a span tag with the following text: "Save up to <spanTag>{price}₾<spanTag>  on your first ride.*/}
                    {/*    <spanTag> should be a span tag with the class "text-blue-500"*/}
                    {/*    Example: Save up to <span className="text-blue-500">5₾</span> on your first ride.*/}
                    {/*    Use the t.markup method to achieve this.*/}
                    {/*    Example: t.markup("SaveMoney", {*/}
                    {/*        spanTag: (price) => `<span className="text-blue-500">${price}</span>`*/}
                    {/*    })*/}

                    {t("SaveMoney", {price: 50})}
                </span>
                <Button variant="solid" color="secondary" size="lg">{t("PublishARide")}</Button>
            </div>
        </div>
    );
};

export default OfferSeatsForm;
