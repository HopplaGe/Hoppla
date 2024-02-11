import React from "react";
import SearchBox from "@/components/partials/SearchBox";
import { auth } from "@/lib/auth";
import FAQSection from "@/components/rides/carpool/FAQSection";
import SplitComponent from "@/components/shared/SplitComponent";
import OfferingsSection from "@/components/rides/carpool/OfferingsSection";
import HeroSection from "@/components/rides/carpool/HeroSection";

interface pageProps {}

export default async function CarpoolPage({}: pageProps) {
  const session = await auth();
  const user = session?.user;
  return (
    <main className="flex flex-col gap-12 py-8 fira-go">
      <div className="page-wrapper">
        <SearchBox className="w-full" />
      </div>
      <OfferingsSection />
      <HeroSection />
      <FAQSection />
    </main>
  );
}
