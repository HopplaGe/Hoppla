import SearchBox from "@/components/partials/SearchBox";
import HeroSection from "./_components/HeroSection";
import FAQSection from "../_components/FAQSection";
import MobileAppBlock from "@/components/partials/MobileAppBlock";

type BusesPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BusesPage({  }: BusesPageProps) {
  return (
    <div className="pt-14 fira-go">

      <div className="page-wrapper">
        <SearchBox className="w-full" />
      </div>
      <HeroSection />
      <FAQSection />
      <MobileAppBlock />
    </div>
  );
}
