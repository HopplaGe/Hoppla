"use client";
import React from "react";
import { useUsers } from "@/hooks/users/useUsers";
import { Avatar } from "@nextui-org/react";
import moment from "moment";
import "moment/locale/ka";

const LastUsersWidget = () => {
  const { data: users, isLoading, isError } = useUsers(5);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <ul className={"flex flex-col space-y-4"}>
      {(users as any[])?.map((user) => (
        <li
          key={user.id}
          className="flex flex-row justify-between items-center fira-go"
        >
          <div className={"flex flex-row gap-2"}>
            <Avatar src={user.image} size={"md"} radius="md" />
            <div className={"flex flex-col"}>
              <span className={"text-sm"}>{user.name}</span>
              <small className={"text-xs"}>{user.email}</small>
            </div>
          </div>
          <div className={"flex flex-col"}>
            <small className={"text-xs"}>
              {moment(user.createdAt).locale("ka").fromNow()}
            </small>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LastUsersWidget;
