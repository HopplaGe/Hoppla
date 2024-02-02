import React from 'react';
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import moment from "moment";

interface IDateTimeInput {
    setDateToLeave: (date: string) => void,
    setTimeToLeave: (time: string) => void
}

const DateTimeInput = ({
                           setDateToLeave,
                           setTimeToLeave
                       }: IDateTimeInput) => {
    return (
        <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5 fira-go">
                    <Label htmlFor="dateToLeave">
                        გასვლის დღე
                    </Label>
                    <Input
                        type="date"
                        name="dateToLeave"
                        id="dateToLeave"
                        defaultValue={moment().format("YYYY-MM-DD")}
                        className="h-12 lg:h-16 py-1.5 px-4"
                        onChange={(e) => {
                            setDateToLeave(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5 fira-go">
                    <Label htmlFor="time">
                        გასვლის დრო
                    </Label>
                    <Input
                        type="time"
                        name="time"
                        id="time"
                        defaultValue={moment().format("HH:mm")}
                        className="h-12 lg:h-16 py-1.5 px-4"
                        onChange={(e) => setTimeToLeave(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default DateTimeInput;
