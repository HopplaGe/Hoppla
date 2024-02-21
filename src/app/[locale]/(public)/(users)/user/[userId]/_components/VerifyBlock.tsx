import React from 'react';
import {cn} from "@/lib/utils";
import {Check, X} from "lucide-react";
import {useTranslations} from "next-intl";

type VerifyBlockProps = {
    user: any;
    verifiedId: boolean;
}

const VerifyBlock = ({user, verifiedId}: VerifyBlockProps) => {
    const t = useTranslations("UserInformation");

    return (
        <div
            className='relative group rounded-xl overflow-hidden border-y-0 p-4 fira-go border-default-100 w-full flex flex-col gap-4'>
            <div
                className="flex flex-row justify-start items-center gap-4">
                <i className={cn("p-1 rounded-md font-bold", verifiedId ? "bg-emerald-500 text-white" : "bg-default-200")}>
                    {verifiedId ? <Check size={16}/> : <X size={16}/>}
                </i>
                <span className="text-xs md:text-sm">{t("VerifieID")}</span>
            </div>
            <div
                className="flex flex-row justify-start items-center gap-4">
                <i className={cn("p-1 rounded-md font-bold", user?.emailVerified ? "bg-emerald-500 text-white" : "bg-default-200")}>
                    {user?.emailVerified ? <Check size={16}/> : <X size={16}/>}
                </i>
                <span className="text-xs md:text-sm">{t("VerifiedEmail")}</span>
            </div>
            <div
                className="flex flex-row justify-start items-center gap-4">
                <i className={cn("p-1 rounded-md font-bold", user?.phone ? "bg-emerald-500 text-white" : "bg-default-200")}>
                    {user?.phone ? <Check size={16}/> : <X size={16}/>}
                </i>
                <span className="text-xs md:text-sm">{t("VerifiedPhone")}</span>
            </div>
        </div>
    );
};

export default VerifyBlock;
