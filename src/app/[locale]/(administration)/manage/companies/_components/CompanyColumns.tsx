"use client"
import {ColumnDef} from "@tanstack/table-core";
import {MdOutlineAirlineSeatReclineExtra} from "react-icons/md";
import {Car, Clock, Delete, Edit} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    Avatar,
    AvatarGroup,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from "@nextui-org/react";
import {EllipsisVerticalIcon} from "@heroicons/react/16/solid";
import React from "react";
import Image from "next/image";

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

export const companyColumns = [
    {
        header: "ლოგო",
        accessorKey: "logo",
        cell: (props: any) => (
            <Image
                src={props.getValue()}
                alt="company logo"
                className={"w-10 h-10 rounded-md"}
                width={40}
                height={40}
            />
        ),
    },
    {
        header: "სახელი",
        accessorKey: "name",
    },
    {
        header: "მისამართი",
        accessorKey: "address",
    },
    {
        header: "მძღოლები",
        accessorKey: "drivers",
        cell: (props: any) => (
            <div className={"flex gap-1 items-center justify-center"}>
               <AvatarGroup size="sm" max={3}>
                    {
                        props.getValue().map((driver: any, index: number) => (
                                <Avatar key={index} src={driver.image} alt={driver.name}/>
                        ))
                    }
               </AvatarGroup>
            </div>
        ),
    },
    {
        header: "ავტომობილები",
        accessorKey: "cars",
        cell: (props: any) => (
            <div className={"flex gap-1 items-center justify-center"}>
                <span className={"bg-default-200 py-1 px-2 rounded-md text-sm font-bold flex flex-row items-center gap-1"}>
                    {props.getValue().length}
                    <Car className={iconClasses} size={16} />
                </span>
            </div>
        ),
    },
    {
        header: "მფლობელი",
        accessorKey: "owner",
        cell: (props: any) => (
            <div className={"flex gap-1 items-center justify-center"}>
                <Avatar src={props.getValue().image} alt={props.getValue().name} size="sm" />
            </div>
        ),
    },
    {
        header: "სტატუსი",
        accessorKey: "status",
        cell: (props: any) => (
            <div
                className={cn(
                    "px-2 py-1 rounded-md text-xs font-semibold uppercase text-center",
                    props.getValue() === "ACTIVE" && "bg-emerald-200 text-emerald-600",
                    props.getValue() === "INACTIVE" && "bg-red-200 text-red-600",
                )}
            >
                {props.getValue() === "ACTIVE" && "აქტიური"}
                {props.getValue() === "INACTIVE" && "არააქტიური"}
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
