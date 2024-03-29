import React, {useEffect, useState} from 'react'
import {Locale} from 'date-fns';
import moment from 'moment';
import {Listbox, ListboxItem} from '@nextui-org/react';
import {cn} from '@/lib/utils';
import {Time} from "@internationalized/date";

type TimeProps = {
    locale?: Locale
    mode?: '12h' | '24h'
    selectedTime?: string
    onSelect?: (time: string) => void
    disabled?: boolean
    placeholder?: string
    className?: string
    style?: React.CSSProperties
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    clearIcon?: React.ReactNode
    clockIcon?: React.ReactNode
    clearAriaLabel?: string
}

const TimePicker = ({
                        onSelect,
                    }: TimeProps) => {
    const [times, setTimes] = useState<Array<any>>([]);

    useEffect(() => {
        const formatTime = () => {
            const items: string[] = [];
            new Array(24).fill(0).forEach((_, index) => { // Use `index` instead of `Time`
                items.push(moment({hour: index}).format('H:mm'));
                items.push(moment({hour: index, minute: 10}).format('H:mm'));
                items.push(moment({hour: index, minute: 20}).format('H:mm'));
                items.push(moment({hour: index, minute: 30}).format('H:mm'));
                items.push(moment({hour: index, minute: 40}).format('H:mm'));
                items.push(moment({hour: index, minute: 50}).format('H:mm'));
            });
            // console.log('items', items);
            setTimes(items);
        }
        formatTime();
    }, []);

    return (
        <div
            className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
            <Listbox
                aria-label="Actions"
                items={times}
                className={cn("w-full h-44 overflow-y-scroll")}
            >
                {times.map((time, index) => (
                    <ListboxItem
                        key={index}
                        value={time}
                        className='w-full'
                        onClick={() => onSelect && onSelect(time)}
                    >
                        {time}
                    </ListboxItem>
                ))}
            </Listbox>
        </div>
    )
}

export default TimePicker