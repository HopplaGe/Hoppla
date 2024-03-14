"use client"
import {cn} from "@/lib/utils";
import {
  Avatar, AvatarGroup,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import {EllipsisVerticalIcon} from "@heroicons/react/16/solid";
import React from "react";
import {Delete, Edit, HeartHandshake, SignpostBig} from "lucide-react";
import { FaCar } from "react-icons/fa";
import moment from "moment";
import "moment/locale/ka";

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

export const userColumns = [
  {
    header: "ფოტო",
    accessorKey: "image",
    cell: (props: any) => (
      <div className={"flex gap-1 items-center"}>
        <Avatar
          src={props.getValue()}
          alt="user image"
          className={"w-10 h-10 rounded-md"}
        />
      </div>
    ),
  },
  {
    header: "სახელი",
    accessorKey: "name",
  },
  {
    header: "ელ-ფოსტა",
    accessorKey: "email",
  },
  {
    header: "მობილური",
    accessorKey: "phone",
  },
  {
    header: <SignpostBig className={iconClasses} size={16} />,
    accessorKey: "Ride",
    cell: (props: any) => (
      <div className={"flex gap-1 items-center"}>
        <div
          className={
            "bg-default-200 py-1 px-2 rounded-md text-sm font-bold flex flex-row items-center gap-1"
          }
        >
          {props.getValue().length}
          <SignpostBig className={iconClasses} size={16} />
        </div>
      </div>
    ),
  },
    {
        header: <FaCar className={iconClasses} size={16} />,
        accessorKey: "Car",
        cell: (props: any) => (
            <div className={"flex gap-1 items-center"}>
                <div
                    className={
                        "bg-default-200 py-1 px-2 rounded-md text-sm font-bold flex flex-row items-center gap-1"
                    }
                >
                    {props.getValue().length}
                    <FaCar className={iconClasses} size={16} />
                </div>
            </div>
        ),
    },
  {
    header: "რეიტინგი",
    accessorKey: "Rating",
    cell: (props: any) => (
      <div className={"flex gap-1 items-center"}>
        <div
          className={
            "py-1 px-2 rounded-md text-sm font-bold flex flex-row items-center gap-1"
          }
        >
          {props
            .getValue()
            .reduce((a: any, b: { rating: any }) => a + b.rating, 0) /
            props.getValue().length || 0}
            {Array.from({length: 5}, (_, index) => (
                <HeartHandshake key={index} size={16} className={
                    props
                        .getValue()
                        .reduce((a: any, b: { rating: any }) => a + b.rating, 0) /
                    props.getValue().length > index ? "text-primary" : "text-gray-300 dark:text-gray-500"
                }/>
            ))}
        </div>
      </div>
    ),
  },
  {
    header: "დამსაქმებელი",
    accessorKey: "workCompany",
    cell: (props: any) => (
      <div className={"flex gap-1 items-center justify-center"}>
        <div>{props.getValue().name}</div>
        <AvatarGroup
          size="sm"
          max={3}
          className={"flex gap-1 items-center justify-center"}
        >
          {props.getValue().map((company: any, index: number) => (
            <Avatar
              key={index}
              src={company.logo}
              alt={company.name}
              size="sm"
              radius={"md"}
            />
          ))}
        </AvatarGroup>
      </div>
    ),
  },
  {
    header: "კომპანია",
    accessorKey: "ownedCompany",
    cell: (props: any) => (
      <div className={"flex gap-1 items-center"}>
        <div>{props.getValue().name}</div>
        <AvatarGroup
          size="sm"
          max={3}
          className={"flex gap-1 items-center justify-center"}
        >
          {props.getValue().map((company: any, index: number) => (
            <Avatar
              key={index}
              src={company.logo}
              alt={company.name}
              size="sm"
              radius={"md"}
            />
          ))}
        </AvatarGroup>
      </div>
    ),
  },
  {
    header: "სტატუსი",
    accessorKey: "role",
    cell: (props: any) => (
      <div className={"flex justify-center items-center"}>
        <div
          className={cn(
            "text-green-400 bg-green-400/10",
            "flex-none rounded-full p-0.5 h-4 w-4 flex items-center justify-center",
            props.getValue() === "ADMIN" &&
              "text-emerald-500 bg-emerald-200/20",
            props.getValue() === "USER" && "text-gray-500 bg-gray-200/20",
          )}
        >
          <div className="h-2 w-2 rounded-full bg-current" />
        </div>
      </div>
    ),
  },
    {
        header: "რეგისტრირებული",
        accessorKey: "createdAt",
        cell: (props: any) => (
            <div className={"flex gap-1 items-center"}>
                <div>{moment(props.getValue()).format('LL')}</div>
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
