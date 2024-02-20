import { useLocale } from "next-intl";
import Hero from "@/components/partials/Hero";
import OfferingsSection from "./(ride)/_components/OfferingsSection";
import MobileAppBlock from "@/components/partials/MobileAppBlock";
import { Suspense } from "react";
import SearchBox from "@/components/partials/SearchBox";
import SvgMap from "@/components/shared/maps/SvgMap";
import { getCountry } from "@/lib/actions/countries";
import About from "@/components/shared/About";

const Home = async () => {
  const local = useLocale();

  const countryId = local === "ka" ? "clstny1yy00008ku7qe62hb1z" : "clsreu24j0001j6z8pv4sb5vd";

  const country = await getCountry(countryId);

  return (
    <>
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="page-wrapper py-12"><SearchBox /></div>
      </Suspense>
      <div className="bg-default-100 py-28 fira-go">
        <div className="page-wrapper mt-16 md:mt-0">
          <About/>
        </div>
        <SvgMap regions={country?.regions}/>
      </div>

      <OfferingsSection />
      <MobileAppBlock />
    </>
  );
}

export default Home;
