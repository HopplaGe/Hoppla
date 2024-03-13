import React from 'react';
import {Button, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {Filter} from "lucide-react";

export type FilterPopoverProps = {
    title: string;
    filterItems: any[];
    columnFiltering?: any[];
    setColumFiltering?: (value: any) => void;
};

const FilterPopover = ({title, filterItems, columnFiltering, setColumFiltering}: FilterPopoverProps) => {
    return (
        <Popover placement={"right-start"} color="default" className={"fira-go"}>
            <PopoverTrigger>
                <Button
                    color="secondary"
                    variant="flat"
                    className="capitalize"
                    startContent={<Filter/>}>
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-2 px-1 flex flex-col gap-2">
                    <h5 className="text-center text-sm font-bold">{title}</h5>
                    <div className="flex flex-col gap-2">
                        {filterItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input type="checkbox" id={item} name={item} value={item} onClick={() => setColumFiltering && setColumFiltering(
                                    (prev: any) => {
                                        const status = prev.find((i: string) => i === item);
                                    }
                                )}/>
                                <label htmlFor={item}>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default FilterPopover;
