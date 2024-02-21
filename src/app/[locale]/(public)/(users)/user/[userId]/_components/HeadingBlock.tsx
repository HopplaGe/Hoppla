import React from 'react';
import { Avatar, Badge } from "@nextui-org/react";
import moment from "moment/moment";
import { useTranslations } from "next-intl";
import { BadgeCheck, X } from 'lucide-react';

type HeadingBlockProps = {
    user: any
}

const HeadingBlock = ({ user }: HeadingBlockProps) => {
    const t = useTranslations("UserInformation");

    const isVerified = false;
    return (
        <div className="w-full flex flex-col justify-center items-center gap-2">
            <Badge
                isOneChar
                className='p-0.5'
                content={isVerified ? <BadgeCheck className='text-default-50' size={32} /> : <X className='text-default-800' size={32} />}
                color={isVerified ? "success" : "default"}
                placement="bottom-left"
                size='lg'
                hidden={!isVerified}
            >
                <Avatar
                    src={user?.image as string}
                    size="lg"
                    radius="lg"
                    isBordered={isVerified}
                    color='success'
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />
            </Badge>
            <h3 className="text-default-700 text-2xl font-bold">{user?.name}</h3>
            <span
                className="text-default-500 text-sm mb-4">{
                    user?.birthdate ? t('Age', { age: moment().diff(user.birthdate, 'years', true).toFixed(0) }) : "დაბადების თარიღი არ არის მითითებული"
                }</span>
        </div>
    );
};

export default HeadingBlock;