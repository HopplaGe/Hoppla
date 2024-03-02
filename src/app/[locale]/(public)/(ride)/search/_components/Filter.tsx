"use client"
import React from 'react';
import {Checkbox, CheckboxGroup, RadioGroup} from "@nextui-org/react";
import {CustomRadio} from "./CustomRadio";
import useRideSort from "@/hooks/rides/useRideSort";
import {useRules} from "@/hooks/rides/useRideRules";

const Filter = () => {

    const {sort, setSort, filter, setFilter, rules, setRules} = useRideSort();

    const {data, isLoading, error} = useRules();

    if(data) console.log(data);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

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
                        defaultValue={[rules as string]}
                        onValueChange={setRules as any}
                    >
                        {Array.isArray(data) && data.map((rule: any) => (
                            <Checkbox key={rule.id} value={rule.id}>
                                {rule.name}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </div>
            </div>
        </div>
    );
};

export default Filter;
