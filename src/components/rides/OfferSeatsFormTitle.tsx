import React from 'react';
import {useTranslations} from "next-intl";

const OfferSeatsFormTitle = () => {
    const t = useTranslations("OfferSeats");
    return (
        <h2 className="w-full text-3xl font-semibold mb-6 text-center  fira-go">{t("title")}</h2>
    );
};

export default OfferSeatsFormTitle;