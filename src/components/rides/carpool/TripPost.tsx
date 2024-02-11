import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type TripPostProps = {};

export default function TripPost({}: TripPostProps) {
  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-center">
      <div className="lg:order-last">
        <Image
          src="/carpool/startdriving.svg"
          alt=""
          height={0}
          width={0}
          className="h-auto w-full"
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="text-3xl font-semibold">Save Money on Your Trips!</h2>
        <p className="text-gray-600">
          Start saving money on your travels today with Hoppla! By offering your
          rides on our platform, you can share the costs with your passengers,
          making your trips more affordable and enjoyable for everyone involved.
        </p>
        <Button asChild>
          <Link href="/offer-seats">Publish a Ride</Link>
        </Button>
      </div>
    </section>
  );
}
