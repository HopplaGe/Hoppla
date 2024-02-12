import SearchBox from "@/components/partials/SearchBox";
import HeroSection from "./_components/HeroSection";
import OfferingsSection from "../_components/OfferingsSection";
import FAQSection from "../_components/FAQSection";

type BusesPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BusesPage({ params, searchParams }: BusesPageProps) {
  return (
    <div className="py-8 fira-go">
      <h2 className="page-wrapper text-xl font-semibold mb-5">Buses</h2>

      <div className="page-wrapper">
        <SearchBox className="w-full" />
      </div>
      <div className="mb-14"></div>
      <OfferingsSection />
      <div className="mb-12"></div>
      <HeroSection />
      <div className="mb-12"></div>
      <FAQSection />
      <div className="mb-12"></div>
    </div>
  );
}
