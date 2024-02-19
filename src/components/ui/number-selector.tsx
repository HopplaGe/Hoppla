"use client"
import React from 'react';
import { Minus, Plus } from "lucide-react";
import { InputProps } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Button } from '@nextui-org/react';

type NumberSelectorProps = {
    state?: any;
} & InputProps;

const NumberSelector = React.forwardRef<HTMLInputElement, NumberSelectorProps>(
    ({ className, type, ...props }, ref) => {
        const t = useTranslations("SearchForm");

        const increment = () => {
            if (props.onChange) {
                const incrementedValue = (props.value as number) + 1;
                const event: { target: { name: string; value: number } } = {
                    target: {
                        value: incrementedValue,
                        name: props.name || '', // Make sure name is not undefined
                    },
                };

                // @ts-ignore
                props.onChange(event);
                event.target.value && props.state(event.target.value)

            }
        };

        const decrement = () => {
            if (props.onChange) {
                const decrementedValue = (props.value as number) - 1;
                const event: { target: { name: string; value: number } } = {
                    target: {
                        value: decrementedValue,
                        name: props.name || '', // Make sure name is not undefined
                    },
                };

                // @ts-ignore
                props.onChange(event);

                // console.log(event)
                event.target.value && props.state(event.target.value)
            }
        };

        return (
            <>
                <div
                    className="hidden lg:relative lg:flex lg:flex-col justify-between items-start gap-2 px-4 py-2 bg-white lg:rounded-md">
                    <div className="flex flex-grow fira-go text-gray-400 text-sm">{t(`Passenger`)}</div>
                    <div className="flex flex-grow-o justify-between items-center">
                        <Button variant="solid" size="sm" color='secondary'
                            className='py-2 min-w-unit-0'
                            onClick={decrement}
                            isDisabled={(props.value as number) <= 1}
                            disabled={(props.value as number) <= 1}
                            startContent={<Minus className="w-3 h-3" />}
                        />
                        <input
                            type={type}
                            ref={ref}
                            {...props}
                            min={1}
                            max={4}
                        />
                        <div className="text-center text-xl min-w-12">{props.value ? props.value : 1}</div>
                        <Button variant="solid" size="sm" color='secondary'
                            className='py-2 min-w-unit-0'
                            onClick={
                                increment
                            }
                            isDisabled={props.value === 4}
                            disabled={props.value === 4}
                            startContent={<Plus className="w-3 h-3" />}
                        />
                    </div>
                </div>

                <div className="lg:hidden min-w-52 px-8 py-4 flex flex-col gap-4">
                    <div className="flex flex-grow fira-go text-secondary text-lg">{t(`Passenger`)}</div>
                    <div className="flex flex-grow-o justify-between items-center mb-4">
                        <Button
                            variant="solid"
                            color='secondary'
                            size="md"
                            className='py-6 min-w-unit-0'
                            onClick={decrement}
                            isDisabled={(props.value as number) <= 1}
                            disabled={(props.value as number) <= 1}
                            startContent={
                                <Minus className="w-6 h-6" />
                            }
                        />
                        <input
                            type={type}
                            ref={ref}
                            {...props}
                            min={1}
                            max={4}
                        />
                        <div className="text-center font-bold text-6xl w-16">{props.value ? props.value : 1}</div>
                        <Button
                            variant="solid"
                            color='secondary'
                            isDisabled={props.value === 4}
                            size="md"
                            className='py-6 min-w-unit-0'
                            onClick={
                                increment
                            }
                            disabled={props.value === 4}
                            startContent={
                                <Plus className="w-6 h-6" />
                            }
                        />
                    </div>
                </div>
            </>
        );
    });

NumberSelector.displayName = 'NumberSelector';

export default NumberSelector;
