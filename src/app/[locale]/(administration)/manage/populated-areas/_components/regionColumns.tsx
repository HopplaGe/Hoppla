"use client"
import {ColumnDef} from "@tanstack/table-core";
import {MdOutlineAirlineSeatReclineExtra} from "react-icons/md";
import {Clock, Delete, Edit} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/react";
import {EllipsisVerticalIcon} from "@heroicons/react/16/solid";
import React from "react";

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

export const regionColumns = [
    {
        header: "სახელი",
        accessorKey: "name",
    },
    {
        header: "დასახლებული პუნქტები",
        accessorKey: "populatedAreas",
        cell: (props: any) => (
            <div className={"flex gap-1 items-center"}>
                <div className={"bg-default-200 p-2 text-sm font-bold rounded-md"}>
                    {props.getValue().length}
                </div>
            </div>
        ),
    },
    {
        header: "ქვეყანა",
        accessorKey: "country",
        cell: (props: any) => (
            <div className={"flex gap-1 items-center"}>
                <div>{props.getValue().name}</div>
            </div>
        ),
    },
    {
        header: "მოქმედებები",
        accessorKey: "actions",
        cell: () => (
            <div className={"flex justify-end"}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="light" className={"py-2 min-w-unit-0 self-end"}>
                            <EllipsisVerticalIcon
                                className={cn(iconClasses, "text-default-500")}
                                width={16}
                            />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        variant="flat"
                        aria-label="Dropdown menu with description"
                        className={"fira-go border-0"}
                    >
                        <DropdownSection title="მოქმედებები" showDivider>
                            <DropdownItem
                                key="edit"
                                description="სტატუსის ცვლილება"
                                startContent={<Edit className={iconClasses} size={16} />}
                            >
                                შესწორება
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection title="საშიში ზონა">
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                description="მგზავრობის წაშლა"
                                startContent={
                                    <Delete
                                        className={cn(iconClasses, "text-danger")}
                                        size={16}
                                    />
                                }
                            >
                                წაშლა
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
            </div>
        ),
    },
];
