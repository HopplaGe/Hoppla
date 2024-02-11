import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type BonusSectionProps = {};

export default function BonusSection({}: BonusSectionProps) {
  return (
    <section className="bg-primary py-8">
      <div className="page-wrapper grid grid-cols-1 gap-5 lg:grid-cols-2 text-white items-center">
        <div>
          <Image
            src="/carpool/present.svg"
            alt=""
            height={0}
            width={0}
            className="h-[400px] w-full"
          />
        </div>
        <div className="flex gap-2 flex-col items-start">
          <h2 className="text-3xl font-semibold">
            Earning a Bonus for Carpooling!
          </h2>
          <p>
            Exciting update for drivers: You are now eligible to earn rewards
            for your carpooling! Qualify for the Carpool Bonus by completing 3
            carpool trips within 3 months.
          </p>

          <Button className="bg-white text-primary font-semibold" asChild>
            <Link href="/safety">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
