import React from 'react';
import Image from "next/image";
import hopplaLogo from "@/assets/images/logo.png";
import hopplaMiniLogo from "@/assets/images/mini_logo.png";
import {Link} from "@nextui-org/react";

const Logo = () => {
    return (
        <Link href="/">
            <div className="hidden lg:block">
                <Image src={hopplaLogo} alt="Hoppla.ge" width={150}/>
            </div>
            <div className="lg:hidden">
                <Image src={hopplaMiniLogo} alt="Hoppla.ge" width={32}/>
            </div>
        </Link>
    );
};

export default Logo;
