import SplitComponent from "@/components/shared/SplitComponent";
import { useTranslations } from "next-intl";
import OfferingsSection from "../../_components/OfferingsSection";

type HeroSectionProps = {};

export default function HeroSection({}: HeroSectionProps) {
  const t = useTranslations("BusesHeroSection");

  return (
    <>
    <SplitComponent
        title={t("comfortableTravel.title")}
        description={t("comfortableTravel.description")}
        img="/buses/buswaiting.svg"
        href=""
        linkText={t("comfortableTravel.linkText")}
        // colored
        turned
      />
      <OfferingsSection />
      <SplitComponent
        title={t("reliableService.title")}
        description={t("reliableService.description")}
        img="/buses/reliable.svg"
        href=""
        linkText={t("reliableService.linkText")}
        colored
        className="bg-default-100 text-default-900"
      />
      
      <SplitComponent
        title={t("bookRide.title")}
        description={t("bookRide.description")}
        img="/buses/booking1.svg"
        href=""
        linkText={t("bookRide.linkText")}
        colored
        turned
      />
    </>
  );
}
