import SplitComponent from "@/components/shared/SplitComponent";

type HeroSectionProps = {};

export default function HeroSection({}: HeroSectionProps) {
  return (
    <>
      <SplitComponent
        title="Reliable Service"
        description="You can trust Hoppla for safe and dependable bus rides. Our drivers are experienced, and our buses are well looked after, so you'll have a smooth journey every time."
        img="/buses/reliable.svg"
        href=""
        linkText="Learn More"
        colored
        // turned
      />
      <SplitComponent
        title="Enjoy Comfortable Bus Travel"
        description="Hoppla offers comfy and cheap bus rides for all your travel needs. Whether you're going far or just across town, our buses are a great way to get there without spending too much."
        img="/buses/buswaiting.svg"
        href=""
        linkText="Learn More"
        // colored
        turned
      />
      <SplitComponent
        title="Book Your Bus Ride Now"
        description="Ready to go on an adventure? Book your bus ride with Hoppla today and enjoy a comfortable and affordable journey!"
        img="/buses/booking1.svg"
        href=""
        linkText="Learn More"
        colored
        // turned
      />
    </>
  );
}
