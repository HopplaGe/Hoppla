import React from "react";
import Image from "next/image";
import hopplaLogo from "@/assets/images/logo2.svg";
import hopplaMiniLogo from "@/assets/images/mini_logo.png";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:block">
        <Image src={hopplaLogo} alt="Hoppla.ge" width={150} />
      </div>
      <div className="lg:hidden">
        <Image src={hopplaMiniLogo} alt="Hoppla.ge" width={32} />
      </div>
    </Link>
  );
};

export default Logo;
