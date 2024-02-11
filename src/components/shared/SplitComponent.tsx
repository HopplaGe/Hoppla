import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

type SplitComponentProps = {
  img: string;
  title: string;
  description: string;
  href: string;
  colored?: boolean;
  turned?: boolean;
  linkText?: string;
};

export default function SplitComponent({
  description,
  href,
  linkText,
  img,
  title,
  colored,
  turned,
}: SplitComponentProps) {
  return (
    <section
      className={`${colored ? "bg-primary" : ""} ${
        colored ? "text-white" : "text-black"
      }`}
    >
      <div className="page-wrapper py-8 grid grid-cols-1 lg:grid-cols-2 items-center fira-go">
        <div className={`${turned ? "lg:order-last" : ""}`}>
          <Image
            src={img}
            alt=""
            height={0}
            width={0}
            className="h-[400px] w-full"
          />
        </div>
        <div className="flex gap-2 flex-col items-start">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p>{description}</p>
          <Button
            className={`${
              colored ? "bg-white text-primary" : ""
            } font-semibold`}
            asChild
          >
            <Link href={href}>{linkText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
