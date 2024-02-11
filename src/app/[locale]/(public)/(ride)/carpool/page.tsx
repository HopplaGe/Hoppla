import React, { FC } from "react";
import SearchBox from "@/components/partials/SearchBox";
import { auth } from "@/lib/auth";
import { Link } from "@/i18n/navigation";
import { BsCoin } from "react-icons/bs";
import { BiCoinStack } from "react-icons/bi";
import TravelOptions from "@/components/rides/carpool/TravelOptions";
import ScamProtectionSection from "@/components/rides/carpool/ScamProtectionSection";
import TripPost from "@/components/rides/carpool/TripPost";
import DestinationSection from "@/components/rides/carpool/DestinationSection";
import FAQSection from "@/components/rides/carpool/FAQSection";
import BonusSection from "@/components/rides/carpool/BonusSection";

interface pageProps {}

const page: FC<pageProps> = async () => {
  const session = await auth();
  // console.log("carpool session", session); // console log to read session

  const user = session?.user;

  return (
    <main className="relative isolate z-10 mb-10">
      <div className="page-wrapper">
        <SearchBox className="my-8" />
      </div>
      <div className="page-wrapper mt-12 my-5 pb-10">
        <TravelOptions />
      </div>
      <ScamProtectionSection />
      <div className="page-wrapper mt-10 my-5 pb-10">
        <TripPost />
      </div>
      <BonusSection />
      <div className="mb-14"></div>
      <FAQSection />
      <div className="mb-14"></div>

      <DestinationSection />
    </main>
  );
};

export default page;
