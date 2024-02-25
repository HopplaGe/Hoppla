"use client";
import Image from "next/image";
import {useTranslations} from "next-intl";
import Link from "next/link";
import {LuLogIn} from "react-icons/lu";
import {MdOutlineTravelExplore} from "react-icons/md";
import {motion} from "framer-motion";
import {Button} from "@nextui-org/react";

const Hero = () => {
    const t = useTranslations("Hero");

    return (
        <>
            <div className="page-wrapper grid lg:grid-cols-2 items-center lg:pt-16 lg:pb-4 pb-8 md:pt-12 fira-go">
                <Image
                    src="/buses/booking.svg"
                    alt="Main Image"
                    height={0}
                    width={0}
                    className="max-h-[400px] mb-10 md:mb-0 w-full block lg:order-last"
                />
                <div className="flex flex-col justify-start items-center lg:items-start">
                    <motion.h1
                        className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter text-center lg:text-left"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                    >
                        {t(`title`, {company: "HOPPLA"})}
                    </motion.h1>
                    <motion.p
                        className="text-sm md:text-md lg:text-lg mt-4 text-gray-800 dark:text-gray-300 max-w-xl md:mx-auto lg:mx-0 text-center lg:text-left"
                        initial={{opacity: 0, x: 0}}
                        animate={{opacity: 1, y: 0}}
                    >
                        {t(`subtitle`)}
                    </motion.p>
                    <div className="hidden mt-6 flex-col sm:flex-row gap-3">
                        <Button
                            size="lg"
                            variant="solid"
                            color="primary"
                            className="flex items-center gap-2"
                            startContent={<MdOutlineTravelExplore/>}
                        >
                            <Link href="/carpool">
                                <span>{t(`travelBtn`)}</span>
                            </Link>
                        </Button>

                        <Button
                            size="lg"
                            variant="light"
                            color="default"
                            className="flex items-center gap-2"
                            startContent={<LuLogIn/>}
                        >
                            <Link href={"/signin"}>
                                <span>{t(`loginBtn`)}</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Hero;
