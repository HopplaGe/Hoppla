import { PiCoins } from "react-icons/pi";
import OfferingCard from "./OfferingCard";
import { AiOutlineSafety } from "react-icons/ai";
import { LuSparkles } from "react-icons/lu";
import { useTranslations } from "next-intl";

type OfferingsSectionProps = {};

export default function OfferingsSection({}: OfferingsSectionProps) {
  const t = useTranslations("OfferingsSection");
  return (
    <section className="page-wrapper">
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <OfferingCard
          icon={PiCoins}
          title={t("AffordableAdventures.title")}
          description={t("AffordableAdventures.description")}
        />
        <OfferingCard
          icon={AiOutlineSafety}
          title={t("SafeTravels.title")}
          description={t("SafeTravels.description")}
        />
        <OfferingCard
          icon={LuSparkles}
          title={t("EasyBooking.title")}
          description={t("EasyBooking.description")}
        />
      </ul>
    </section>
  );
}
