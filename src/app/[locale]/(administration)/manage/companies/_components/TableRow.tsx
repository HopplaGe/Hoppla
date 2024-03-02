import React from "react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/ka";
import { Avatar, AvatarGroup, Button, Snippet } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";

const TableRow = ({ item }: { item: any }) => {
  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="stext-gray-800 dark:text-white font-bold">
            {item.name}
          </h2>
          <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
            <small>მფლობელი:</small> {item.owner.name}
          </p>
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div>
          <h4 className="text-gray-700 dark:text-gray-200">
            Content curating app
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Brings all your news into one place
          </p>
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <AvatarGroup
            size="sm"
            radius={"md"}
            max={1}
            renderCount={(count) => (
              <Avatar
                key={count}
                classNames={{
                  base: "bg-default-100 text-default-500",
                  name: "font-bold text-sm",
                }}
                style={{
                  zIndex: 1,
                  marginLeft: -8,
                }}
                name={`+${count}`}
              >
                +{count}
              </Avatar>
            )}
            className="flex -space-x-2"
          >
            {item.drivers.map((driver: any) => (
              <Avatar
                key={driver.id}
                src={driver.image}
                alt={driver.name}
                name={driver.name}
                size="sm"
                radius="md"
                onClick={() => {
                    console.log("clicked");
                }}
              />
            ))}
          </AvatarGroup>
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="text-xs">{item.cars.length}</div>
      </td>

      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div
          className={cn(
            "inline px-2 py-1 text-xs font-semibold rounded-md",
            item.status === "ACTIVE"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-red-100 text-red-800",
          )}
        >
          {item.status === "ACTIVE" ? "აქტიური" : "არა აქტიური"}
        </div>
      </td>

      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <Button
          size="sm"
          variant="light"
          className="text-xs min-w-unit-0 text-default-400"
          color="default"
          startContent={<MoreVertical size={16} />}
        />
      </td>
    </tr>
  );
};

export default TableRow;
