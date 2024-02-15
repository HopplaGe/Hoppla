import SearchBox from "@/components/partials/SearchBox";
import { auth } from "@/lib/auth";
import OfferingsSection from "../_components/OfferingsSection";
import HeroSection from "./_components/HeroSection";
import FAQSection from "../_components/FAQSection";
import MobileAppBlock from "@/components/partials/MobileAppBlock";

interface pageProps {}

export default async function CarpoolPage({}: pageProps) {
  const session = await auth();
  const user = session?.user;
  return (
    <main className="fira-go pt-14">

      <div className="page-wrapper">
        <SearchBox className="w-full" />
      </div>
      <div className="mb-14"></div>
      <OfferingsSection />
      <HeroSection />
      <FAQSection />
      <MobileAppBlock />
    </main>
  );
}
