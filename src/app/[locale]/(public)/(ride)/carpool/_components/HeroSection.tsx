import SplitComponent from "@/components/shared/SplitComponent";
import { useTranslations } from "next-intl";

type HeroSectionProps = {};

export default function HeroSection({}: HeroSectionProps) {
  const t = useTranslations("CarpoolHeroSection");

  return (
    <>
      <SplitComponent
        linkText={t("StaySafeFromScams.linkText")}
        href="/safety"
        title={t("StaySafeFromScams.title")}
        description={t("StaySafeFromScams.description")}
        img="/carpool/protection7.svg"
        colored
      />
      <SplitComponent
        linkText={t("PublishARide.linkText")}
        href="/publish-ride"
        title={t("PublishARide.title")}
        description={t("PublishARide.description")}
        img="/carpool/startdriving.svg"
        turned
      />
      <SplitComponent
        linkText={t("EarningABonusForCarpooling.linkText")}
        href="/bonus"
        title={t("EarningABonusForCarpooling.title")}
        description={t("EarningABonusForCarpooling.description")}
        img="/carpool/present.svg"
        colored
      />
    </>
  );
}
