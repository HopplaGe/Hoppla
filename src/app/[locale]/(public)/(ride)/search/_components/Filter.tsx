"use client"
import React from 'react';
import {Checkbox, CheckboxGroup, RadioGroup} from "@nextui-org/react";
import {CustomRadio} from "./CustomRadio";
import useSort from "@/hooks/rides/useSort";
import {useSearchParams} from "next/navigation";

const Filter = () => {

    const {sort, setSort, filter, setFilter} = useSort();

    return (
        <div className="hidden lg:block">
            <div className="bg-transparent rounded-xl fira-go">

                <RadioGroup
                    label="ფილტრაცია"
                    onValueChange={setSort}
                    defaultChecked
                    defaultValue={sort}
                >
                    <CustomRadio value="price-asc">
                        ფასის მიხედვით
                    </CustomRadio>
                    <CustomRadio value="time-asc">
                        დროს მიხედვით
                    </CustomRadio>
                </RadioGroup>
                <div className="mt-4">
                    <CheckboxGroup
                        label="ნდობა და უსაფრთხოება"
                        defaultValue={[filter as string]}
                        onValueChange={setFilter as any}
                    >
                        <Checkbox value="verified">ვერიფიცირებული მძღოლი</Checkbox>
                        <Checkbox value="rating">რეიტინგული</Checkbox>
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
    );
};

export default Filter;
