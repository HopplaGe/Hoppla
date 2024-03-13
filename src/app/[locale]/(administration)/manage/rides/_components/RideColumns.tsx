"use client"
import {ColumnDef} from "@tanstack/table-core";
import {MdOutlineAirlineSeatReclineExtra} from "react-icons/md";
import {Clock, Delete, Edit} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/react";
import {EllipsisVerticalIcon} from "@heroicons/react/16/solid";
import React from "react";

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

export type Ride = {
  id: string;
  from: string;
  to: string;
  price: number;
  seats: number;
  startTime: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED" | "COMPLETED";
};

export const rideColumns = [
  {
    header: "საიდან",
    accessorKey: "from",
  },
  {
    header: "სად",
    accessorKey: "to",
  },
  {
    header: "ფასი",
    accessorKey: "price",
    cell: (props: any) => (
        <div className={"flex gap-1 items-center"}>
          <div className={"bg-default-200 p-2 text-sm font-bold rounded-md"}>
            {props.getValue()} ₾
          </div>
        </div>
    ),
  },
  {
    header: "მგზავრების რაოდენობა",
    accessorKey: "seats",
    cell: (props: any) => (
        <div className={"flex gap-1 items-center"}>
          {Array.from({ length: props.getValue() }).map((_, index) => (
              <MdOutlineAirlineSeatReclineExtra
                  key={index}
                  className={iconClasses}
                  size={16}
              />
          ))}
        </div>
    ),
  },
  {
    header: "გასვლის დრო",
    accessorKey: "startTime",
    cell: (props: any) => (
        <div className={"flex gap-1 items-center"}>
          <Clock className={iconClasses} size={16} />
          <div>{props.getValue()}</div>
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
                props.getValue() === "PENDING" && "bg-amber-200 text-amber-600",
                props.getValue() === "ACCEPTED" && "bg-green-200 text-green-600",
                props.getValue() === "REJECTED" && "bg-red-200 text-red-600",
                props.getValue() === "CANCELED" && "bg-red-200 text-red-600",
                props.getValue() === "COMPLETED" && "bg-blue-200 text-blue-600",
            )}
        >
          {props.getValue() === "PENDING" && "მომლოდინე"}
          {props.getValue() === "ACCEPTED" && "დადასტურებული"}
          {props.getValue() === "REJECTED" && "უარყოფილი"}
          {props.getValue() === "CANCELED" && "გაუქმებული"}
          {props.getValue() === "COMPLETED" && "დასრულებული"}
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
