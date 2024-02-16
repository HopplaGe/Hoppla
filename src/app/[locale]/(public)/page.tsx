import { useTranslations } from "next-intl";
import Hero from "@/components/partials/Hero";
import OfferingsSection from "./(ride)/_components/OfferingsSection";
import MobileAppBlock from "@/components/partials/MobileAppBlock";
import { Suspense } from "react";
import SearchBox from "@/components/partials/SearchBox";
import SvgMap from "@/components/shared/maps/SvgMap";
import { regions } from "@/lib/data/regions";

export default function Index() {
  const t = useTranslations("Hero");
  return (
    <>
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="page-wrapper py-12"><SearchBox /></div>
      </Suspense>
      <div className="bg-default-100 py-28 fira-go">
        <div className="page-wrapper mt-16 md:mt-0">
          <h2 className="text-4xl text-secondary lg:text-5xl font-bold lg:tracking-tight">
            {t(`aboutTitle`, { company: "HOPPLA" })}
          </h2>
          <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
            {t(`aboutDesc`)}
          </p>
        </div>
        <SvgMap regions={regions}/>
      </div>

      <OfferingsSection />
      <MobileAppBlock />
    </>
  );
}
