import React from "react";
import Image from "next/image";
import hopplaLogo from "@/assets/images/logo.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="block">
        <Image src={hopplaLogo} alt="Hoppla.ge" height={36} />
      </div>
      {/* <div className="lg:hidden">
        <Image src={hopplaMiniLogo} alt="Hoppla.ge" width={32} />
      </div> */}
    </Link>
  );
};

export default Logo;
