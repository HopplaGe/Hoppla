"use client";
import React from 'react';
import moment from "moment/moment";
import 'moment/locale/ka';
import 'moment/locale/ru';
import 'moment/locale/hy-am';
import 'moment/locale/az';
import {useLocale, useTranslations} from "next-intl";

type InfoBlockProps = {
    rides: number;
    user: any;
}

const InfoBlock = ({rides, user}: InfoBlockProps) => {
    const locale = useLocale();
    const t = useTranslations("UserInformation");

    return (
        <div
            className='relative group rounded-xl overflow-hidden border-y-4 p-4 fira-go border-default-100 w-full flex flex-col gap-4'>
            <div
                className="flex flex-row justify-between items-center ">
                    <span className="text-xs md:text-sm">
                       {/*{rides} გამოქვეყნებული მგზავრობა*/}
                        {t.rich("PostedRides", {
                            count: rides,
                            countText: (chunks: any) => <span
                                className="text-xs md:text-sm font-bold text-primary">{chunks}</span>
                        })}
                    </span>
            </div>
            <div
                className="flex flex-row justify-between items-center ">
                    <span className="text-xs md:text-sm">
                        {t("Joined")} {moment(
                        user?.createdAt,
                        "YYYYMMDD",
                        locale === "am" ? "hy-am" : locale
                    ).fromNow()}
                        {/*{user?.createdAt.toString()}*/}
                    </span>
            </div>
        </div>
    );
};

export default InfoBlock;
