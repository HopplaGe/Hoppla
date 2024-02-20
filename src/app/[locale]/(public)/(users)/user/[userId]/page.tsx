import React from 'react';
import {getUserById} from "@/lib/actions/users";
import {Avatar, Button} from "@nextui-org/react";
import {ridesCountByDriver} from "@/lib/actions/stats";
import moment from "moment";
import {Check, Star, X} from "lucide-react";
import {cn} from "@/lib/utils";

type UserViewProps = {
    params: { userId: string }
}

const UserView = async ({params}: UserViewProps) => {

    const user = await getUserById(params.userId);

    const rides = await ridesCountByDriver(params.userId);

    const verifiedId = false

    return (
        <div className="page-wrapper w-full lg:w-1/2 max-w-7xl py-4 lg:py-8 flex flex-col fira-go divide-y-4">
            <div className="w-full flex flex-col justify-center items-center gap-2">
                <Avatar src={user?.image as string} size="lg" radius="lg"
                        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"/>
                <h3 className="text-default-700 text-2xl font-bold">{user?.name}</h3>
                <span
                    className="text-default-500 text-sm mb-4">{
                    user?.birthdate ? `${moment().diff('1990-05-09', 'years', true).toFixed(0)} წლის` : "დაბადების თარიღი არ არის მითითებული"
                }</span>
            </div>

            <div
                className='relative group rounded-xl overflow-hidden border-y-0 p-4 fira-go border-default-100 w-full flex flex-row justify-between items-center gap-4'>
                <div className="flex flex-row justify-start items-center gap-4">
                    <i className="p-1 rounded-md font-bold bg-emerald-500 text-white">
                        <Star size={16}/>
                    </i>
                    <span className="text-medium lg:text-lg font-bold">
                        4.3 / 5
                    </span>
                </div>
                <div className="flex flex-row justify-start items-center gap-2">
                    <span className="text-xs md:text-sm font-bold text-primary">51</span>
                    <span className="text-xs md:text-sm">შეფასება</span>
                </div>
            </div>

            <div
                className='relative group rounded-xl overflow-hidden border-y-0 p-4 fira-go border-default-100 w-full flex flex-col gap-4'>
                <div
                    className="flex flex-row justify-start items-center gap-4">
                    <i className={cn("p-1 rounded-md font-bold", verifiedId ? "bg-emerald-500 text-white" : "bg-default-200")}>
                        {verifiedId ? <Check size={16}/> : <X size={16}/>}
                    </i>
                    <span className="text-xs md:text-sm">ვერიფიცირებული ID</span>
                </div>
                <div
                    className="flex flex-row justify-start items-center gap-4">
                    <i className={cn("p-1 rounded-md font-bold", user?.emailVerified ? "bg-emerald-500 text-white" : "bg-default-200")}>
                        {user?.emailVerified ? <Check size={16}/> : <X size={16}/>}
                    </i>
                    <span className="text-xs md:text-sm">ვერიფიცირებული ელ.ფოსტა</span>
                </div>
                <div
                    className="flex flex-row justify-start items-center gap-4">
                    <i className={cn("p-1 rounded-md font-bold", user?.phone ? "bg-emerald-500 text-white" : "bg-default-200")}>
                        {user?.phone ? <Check size={16}/> : <X size={16}/>}
                    </i>
                    <span className="text-xs md:text-sm">ვერიფიცირებული ტელ. ნომერი</span>
                </div>
            </div>
            <div
                className='relative group rounded-xl overflow-hidden border-y-4 p-4 fira-go border-default-100 w-full flex flex-col gap-4'>
                <div
                    className="flex flex-row justify-between items-center ">
                    <span className="text-xs md:text-sm">
                       {rides} გამოქვეყნებული მგზავრობა
                    </span>
                </div>
                <div
                    className="flex flex-row justify-between items-center ">
                    <span className="text-xs md:text-sm">
                        გაწევრიანდა {moment(user?.createdAt, "YYYYMMDD").fromNow()}
                        {/*{user?.createdAt.toString()}*/}
                    </span>
                </div>
            </div>

            <div
                className='relative group rounded-xl overflow-hidden border-y-4 p-4 fira-go border-default-100 w-full flex justify-center items-center gap-4'>
                <Button
                    className="w-auto"
                    color="default"
                    size="sm"
                    variant="light"
                >
                    შეტყობინება ადმინისტრაციას
                </Button>

            </div>

        </div>
    );
};

export default UserView;
