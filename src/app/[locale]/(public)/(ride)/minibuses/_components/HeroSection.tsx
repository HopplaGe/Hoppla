import SplitComponent from "@/components/shared/SplitComponent";
import { useTranslations } from "next-intl";

type HeroSectionProps = {};

export default function HeroSection({}: HeroSectionProps) {
  const t = useTranslations("MiniBusesHeroSection");

  return (
    <>
      <SplitComponent
        linkText={t("findEasyTravel.linkText")}
        href="/safety"
        title={t("findEasyTravel.title")}
        description={t("findEasyTravel.description")}
        img="/minibuses/together.svg"
        className="bg-default-100 text-default-900"
        colored
      />
      <SplitComponent
        linkText={t("comfyTravel.linkText")}
        href="/publish-ride"
        title={t("comfyTravel.title")}
        description={t("comfyTravel.description")}
        img="/minibuses/minibus.svg"
        turned
      />
      <SplitComponent
        linkText={t("bookRide.linkText")}
        href="/bonus"
        title={t("bookRide.title")}
        description={t("bookRide.description")}
        img="/minibuses/booking.svg"
        colored
      />
    </>
  );
}
