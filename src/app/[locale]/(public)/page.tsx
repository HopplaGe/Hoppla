import {useLocale} from "next-intl";
import Hero from "@/components/partials/Hero";
import OfferingsSection from "./(ride)/_components/OfferingsSection";
import MobileAppBlock from "@/components/partials/MobileAppBlock";
import {Suspense} from "react";
import SearchBox from "@/components/partials/SearchBox";
import SvgMap from "@/components/shared/maps/SvgMap";
import {getCountry} from "@/lib/actions/countries";
import About from "@/components/shared/About";

const Home = async () => {
    const local = useLocale();

    const countryId = local === "ka" ? "clsum148l0000m3n7kz6e4auk" : "clsreu24j0001j6z8pv4sb5vd";

    const country = await getCountry(countryId);

    return (
        <>
            <Hero/>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="page-wrapper py-12"><SearchBox/></div>
            </Suspense>
            <div className="bg-default-100 py-4 md:py-14 lg:py-28 fira-go">
                <div className="page-wrapper mt-6 md:mt-0 mb-8 lg:mb-0">
                    <About/>
                </div>
                <SvgMap regions={country?.regions}/>
            </div>

            <OfferingsSection/>
            <MobileAppBlock/>
        </>
    );
}

export default Home;
