import React from 'react';
import {Avatar} from "@nextui-org/react";
import moment from "moment/moment";
import {useTranslations} from "next-intl";

type HeadingBlockProps = {
    user: any
}

const HeadingBlock = ({user}: HeadingBlockProps) => {
    const t = useTranslations("UserInformation");
    return (
        <div className="w-full flex flex-col justify-center items-center gap-2">
            <Avatar src={user?.image as string} size="lg" radius="lg"
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"/>
            <h3 className="text-default-700 text-2xl font-bold">{user?.name}</h3>
            <span
                className="text-default-500 text-sm mb-4">{
                user?.birthdate ? t('Age', {age: moment().diff(user.birthdate, 'years', true).toFixed(0)}) : "დაბადების თარიღი არ არის მითითებული"
            }</span>
        </div>
    );
};

export default HeadingBlock;


// ${moment().diff(user.birthdate, 'years', true).toFixed(0)} წლის