import React from 'react';
import {Coins, Rocket, ShieldCheck} from "lucide-react";
import {useTranslations} from "next-intl";

const serviceCards = [
    {
        title: "SaveOnTravelCosts",
        icon: <Coins size={44}/>,
        description: "SaveOnTravelCostsDescription"
    },
    {
        title: "JoinATrustworthyCommunity",
        icon: <ShieldCheck size={44}/>,
        description: "JoinATrustworthyCommunityDescription"
    },
    {
        title: "CarpoolingMadeSimple",
        icon: <Rocket size={44}/>,
        description: "CarpoolingMadeSimpleDescription"
    }
]

const OfferInfoCards = () => {
    const t = useTranslations("OfferSeats.OfferSeatsInfoCards");

    return (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 fira-go">
            <h2 className="text-2xl font-bold col-span-full">{t("title")}</h2>
            {/*Service Cards*/}
            {serviceCards.map((card, index) => (
                <div key={index} className="bg-white p-4 rounded-xl hover:shadow-md">
                    <div className="grid grid-cols-4 items-center justify-between">
                        <div className="col-span-3 flex flex-col gap-4">
                            <h3 className="text-xl font-bold">{t(card.title)}</h3>
                            <p className="text-sm">{t(card.description)}</p>
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}

        </section>
    );
};

export default OfferInfoCards;
