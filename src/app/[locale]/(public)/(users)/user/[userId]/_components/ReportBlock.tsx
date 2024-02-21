import React from 'react';
import {Button} from "@nextui-org/react";
import {useTranslations} from "next-intl";

const ReportBlock = () => {
    const t = useTranslations("UserInformation");
    return (
        <div
            className='relative group rounded-xl overflow-hidden border-y-4 p-4 fira-go border-default-100 w-full flex justify-center items-center gap-4'>
            <Button
                className="w-auto"
                color="default"
                size="sm"
                variant="light"
            >
                {t("ReportThisUser")}
            </Button>

        </div>
    );
};

export default ReportBlock;
