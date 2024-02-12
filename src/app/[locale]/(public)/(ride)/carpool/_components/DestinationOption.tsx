import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type DestinationOptionProps = {
  from: string;
  to: string;
  href: string;
};

export default function DestinationOption({
  from,
  to,
  href,
}: DestinationOptionProps) {
  return (
    <Button asChild className="bg-white text-black">
      <Link href={href} className="flex gap-2 text-left justify-start">
        <div>{from}</div>
        <FaArrowRight className="text-gray-600" />
        <div>{to}</div>
      </Link>
    </Button>
  );
}
