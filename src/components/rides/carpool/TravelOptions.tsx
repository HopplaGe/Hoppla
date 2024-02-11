import { BiCoinStack } from "react-icons/bi";
import TravelOption from "./TravelOption";
import { AiOutlineSafety } from "react-icons/ai";
import { GiSpeedometer } from "react-icons/gi";
import { BsSpeedometer2 } from "react-icons/bs";
import { PiCoins } from "react-icons/pi";
import { IoSparklesOutline } from "react-icons/io5";
import { LuSparkles } from "react-icons/lu";

type TravelOptionsProps = {};

export default function TravelOptions({}: TravelOptionsProps) {
  return (
    <section>
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <TravelOption
          icon={PiCoins}
          title="Affordable Adventures"
          description="Discover great places to visit without spending too much money! Whether you're traveling by bus or sharing a ride with others, we have lots of affordable options for you."
        />
        <TravelOption
          icon={AiOutlineSafety}
          title="Safe Travels"
          description="We care about your safety. We check the people who use our service and the companies we work with to make sure they're trustworthy. You can relax knowing who you'll be traveling with and book securely through our app."
        />
        <TravelOption
          icon={LuSparkles}
          title="Easy Booking"
          description="Booking your next trip is super easy with our app. Just search for nearby rides, click on the one you like, and you're all set to go!"
        />
      </ul>
    </section>
  );
}
