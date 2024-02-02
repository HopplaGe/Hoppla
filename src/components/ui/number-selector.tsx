"use client"
import React from 'react';
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {InputProps} from "@/components/ui/input";

const NumberSelector = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {


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
            }
        };

        return (
            <>
                <div
                    className="hidden lg:relative lg:flex lg:flex-col justify-between items-start gap-2 px-4 py-2 bg-white lg:rounded-md">
                    <div className="flex flex-grow fira-go text-gray-400 text-sm">მგზავრი</div>
                    <div className="flex flex-grow-o justify-between items-center">
                        <Button variant="secondary" size="sm"
                                onClick={decrement}
                                disabled={(props.value as number) <= 1}
                        >
                            <Minus className="w-3 h-3"/>
                        </Button>
                        <input
                            type={type}
                            ref={ref}
                            {...props}
                            min={1}
                            max={4}
                        />
                        <div className="text-center text-xl min-w-12">{props.value ? props.value : 1}</div>
                        <Button variant="secondary" size="sm"
                                onClick={
                                    increment
                                }
                                disabled={props.value === 4}
                        >
                            <Plus className="w-3 h-3"/>
                        </Button>
                    </div>
                </div>

                <div className="lg:hidden">
                    <div className="flex flex-grow fira-go text-gray-400 text-sm">მგზავრი</div>
                    <div className="flex flex-grow-o justify-between items-center">
                        <Button variant="secondary" size="sm"
                                onClick={decrement}
                                disabled={(props.value as number) <= 1}
                        >
                            <Minus className="w-3 h-3"/>
                        </Button>
                        <input
                            type={type}
                            ref={ref}
                            {...props}
                            min={1}
                            max={4}
                        />
                        <div className="text-center text-xl min-w-12">{props.value ? props.value : 1}</div>
                        <Button variant="secondary" size="sm"
                                onClick={
                                    increment
                                }
                                disabled={props.value === 4}
                        >
                            <Plus className="w-3 h-3"/>
                        </Button>
                    </div>
                </div>
            </>
        );
    });

NumberSelector.displayName = 'NumberSelector';

export default NumberSelector;
