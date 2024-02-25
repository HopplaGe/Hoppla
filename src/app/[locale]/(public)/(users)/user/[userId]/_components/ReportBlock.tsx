"use client"
import React from 'react';
import {Button} from "@nextui-org/react";
import {useTranslations} from "next-intl";
import useCurrentUser from "@/hooks/users/useCurrentUser";

type ReportBlockProps = {
    user: any
}

const ReportBlock = ({user}: ReportBlockProps) => {
    const t = useTranslations("UserInformation");
    const currentUser = useCurrentUser();

    return (
        <div
            className='relative group rounded-xl overflow-hidden border-y-4 p-4 fira-go border-default-100 w-full flex justify-center items-center gap-4'>
            {currentUser && currentUser.id !== user.id ? (
                    <Button
                        className="w-auto"
                        color="default"
                        size="sm"
                        variant="light"
                    >
                        {t("ReportThisUser")}
                    </Button>
                )
                :
                (
                    <Button
                        className="w-auto"
                        color="default"
                        size="sm"
                        variant="light"
                    >
                        {t("EditProfile")}
                    </Button>
                )
            }
        </div>
    );
};

export default ReportBlock;
