"use client"
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from "class-variance-authority";
import { Car, TrendingDown, TrendingUp } from 'lucide-react';
import React, { FC } from 'react'

const statCardStyle = cva(
    "p-2",
    {
        variants: {
            color: {
                primary: "bg-primary text-white",
                secondary: "bg-secondary text-white",
                dark: "bg-default-900 text-default-50",
                light: "bg-default-100 text-default-700",
                green: "bg-green-300 text-green-700",
                red: "bg-red-300 text-red-700",
                violet: "bg-violet-300 text-violet-700",
                blue: "bg-blue-300 text-blue-700",
            }
        },
        defaultVariants: {
            color: "green"
        }
    }

)

type StatCardProps = {
    title: string;
    value: number | string;
    data: any;
    color?: string;
    icon?: any;
    percent?: string;
    status?: string;
} & VariantProps<typeof statCardStyle>

const StatCard: FC<StatCardProps> = ({ title, value, data, color, icon, percent, status }) => {
    return (
        <div className={cn('grid grid-cols-3 px-4 py-4 bg-white rounded-xl')}>
            <div className='col-span-2 text-3xl font-bold'>{value}</div>
            <div className='col-span-2 fira-go text-sm'>{title}</div>
            {
                percent && <div className='col-span-2 fira-go flex flex-row gap-1 justify-start items-center text-[0.6rem]'>
                    <span className={cn('flex flex-row gap-1 justify-start items-center', status === "increase" ? "text-emerald-500" : "text-red-500")}>
                        {status === "increase" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {percent}
                    </span>
                    <span className=''>გასული თვიდან</span>
                </div>
            }
            <div className='col-start-3 row-start-1 row-end-4 grid place-items-center'>
                <div className={cn('rounded-xl ', statCardStyle({ color }))}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default StatCard