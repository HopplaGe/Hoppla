import Hero from "@/components/partials/Hero";
import OfferingsSection from "./(ride)/_components/OfferingsSection";
import MobileAppBlock from "@/components/partials/MobileAppBlock";
import { Suspense } from "react";
import SvgMap from "@/components/shared/maps/SvgMap";
import About from "@/components/shared/About";
import { SearchBox } from "@/components/hoppla";

const Home = async () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="page-wrapper py-12">
          <SearchBox />
        </div>
      </Suspense>
      <div className="bg-default-100 py-4 md:py-14 lg:py-28 fira-go">
        <div className="page-wrapper mt-6 md:mt-0 mb-8 lg:mb-0">
          <About />
        </div>
        <SvgMap />
      </div>
      <OfferingsSection />
      <MobileAppBlock />
    </>
  );
};

export default Home;
