import React, { Suspense } from 'react';
import SearchBox from "@/components/partials/SearchBox";
import RidesResultList from "@/components/rides/RidesResultList";
import { getRideByFromAndToAndDateAndSeats } from '@/lib/actions/rides';
import { RadioGroup, CheckboxGroup, Checkbox } from "@nextui-org/react";
import CarTypesTab from "./_components/CarTypesTab";
import { CustomRadio } from './_components/CustomRadio';

interface pageProps {
    searchParams: {
        from: string | undefined;
        to: string;
        date: string;
        seats: number;
        transport_type?: string;
        sort?: string;
        filter?: string;
    }
}

const Search = async ({ searchParams }: pageProps) => {
    const rides = await getRideByFromAndToAndDateAndSeats(searchParams.from as string, searchParams.to, searchParams.date, Number(searchParams.seats), searchParams.sort);

    return (
        <>
            <div className="page-wrapper">
                <SearchBox className="my-8" />
                <div className="pb-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="hidden lg:block">
                        <div className="bg-transparent rounded-xl fira-go">

                            <RadioGroup label="ფილტრაცია">
                                <CustomRadio value="free">
                                    ფასის მიხედვით
                                </CustomRadio>
                                <CustomRadio value="pro">
                                    დროს მიხედვით
                                </CustomRadio>
                                <CustomRadio
                                    value="enterprise"
                                >
                                    ყველაზე ახლოს
                                </CustomRadio>
                            </RadioGroup>
                            <div className="mt-4">
                                <CheckboxGroup
                                    label="ნდობა და უსაფრთხოება"
                                    defaultValue={["buenos-aires"]}
                                >
                                    <Checkbox value="buenos-aires">ვერიფიცირებული მძღოლი</Checkbox>
                                    <Checkbox value="london">რეიტინგული</Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div className="mt-4">
                                <CheckboxGroup
                                    label="წესები"
                                    defaultValue={["buenos-aires"]}
                                >
                                    <Checkbox value="buenos-aires">სიგარეტის მოწევა</Checkbox>
                                    <Checkbox value="london">ცხოველების ტრანსპორტირება</Checkbox>
                                    <Checkbox value="london">კონდიციონერი</Checkbox>
                                    <Checkbox value="london">ბარგი</Checkbox>

                                </CheckboxGroup>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <CarTypesTab transport_type={searchParams.transport_type as string} />
                        <Suspense fallback={<div>Loading...</div>}>
                            <RidesResultList rides={rides} searchParams={searchParams} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;