import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type ScamProtectionSectionProps = {};

export default function ScamProtectionSection({}: ScamProtectionSectionProps) {
  return (
    <section className="bg-primary py-8">
      <div className="page-wrapper grid grid-cols-1 gap-5 lg:grid-cols-2 text-white items-center">
        <div>
          <Image
            src="/carpool/protection7.svg"
            alt=""
            height={0}
            width={0}
            className="h-[400px] w-full"
          />
        </div>
        <div className="flex gap-2 flex-col items-start">
          <h2 className="text-3xl font-semibold">Stay Safe from Scams</h2>
          <p>
            We want to keep you safe while using our platform. Even though we
            try our best, scams still happen. Learn how to spot and report scams
            to help us protect you.
          </p>

          <Button className="bg-white text-primary font-semibold" asChild>
            <Link href="/safety">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
