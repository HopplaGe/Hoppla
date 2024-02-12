import SplitComponent from "@/components/shared/SplitComponent";
import { useTranslations } from "next-intl";

type HeroSectionProps = {};

export default function HeroSection({}: HeroSectionProps) {
  const t = useTranslations("HeroSection");

  return (
    <>
      <SplitComponent
        linkText="Learn More"
        href="/safety"
        title="Find Easy Mini Bus Travel"
        description="Discover how simple it is to travel in mini buses with Hoppla! Whether you're going around town or on a short trip, our mini buses give you comfy rides at low prices. Fast Rides"
        img="/minibuses/together.svg"
        colored
      />
      <SplitComponent
        linkText="Learn More"
        href="/publish-ride"
        title="Comfy Travel"
        description="Relax in our well-kept mini buses. They're cozy and clean, making your journey pleasant and easy."
        img="/minibuses/minibus.svg"
        turned
      />
      <SplitComponent
        linkText="Book Now"
        href="/bonus"
        title="Book Your Ride Today"
        description="Ready to go? Book your mini bus ride with Hoppla now and enjoy an easy journey!"
        img="/minibuses/booking.svg"
        colored
      />
    </>
  );
}
