import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";

type SplitComponentProps = {
  img: string;
  title: string;
  description: string;
  href: string;
  colored?: boolean;
  turned?: boolean;
  linkText?: string;
  className?: string;
};

export default function SplitComponent({
  description,
  href,
  linkText,
  img,
  title,
  colored,
  turned,
  className
}: SplitComponentProps) {
  return (
    <section
      className={cn(colored ? "bg-primary" : "", colored ? "text-white" : "text-black", "lg:py-16", className)}
    >
      <div className="page-wrapper py-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-center fira-go">
        <div className={cn(turned ? "lg:order-last" : "")}>
          <Image
            src={img}
            alt=""
            height={0}
            width={0}
            className="h-[400px] w-full"
          />
        </div>
        <div className="flex gap-6 flex-col items-start">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p>{description}</p>
          <Button
            size="lg"
            variant="solid"
            color={colored ? "secondary" : "primary"}
            className={cn()}
          >
            <Link href={href}>{linkText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
