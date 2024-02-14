"use client";
import Image from "next/image";

import carpoolBg from "@/assets/images/banners/carpoolbg.svg";
import { useTranslations } from "next-intl";
import SearchBox from "@/components/partials/SearchBox";
import OfferingsSection from "@/app/[locale]/(public)/(ride)/_components/OfferingsSection";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";
import { MdOutlineTravelExplore } from "react-icons/md";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <>
      <div className="page-wrapper grid lg:grid-cols-2 items-center py-16 pb-8 md:pt-12 fira-go">
        <Image
          src="/buses/booking.svg"
          alt="Main Image"
          height={0}
          width={0}
          className="max-h-[400px] mb-10 md:mb-0 w-full block lg:order-last"
        />
        <div>
          <motion.h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t(`title`, { company: "HOPPLA" })}
          </motion.h1>
          <motion.p
            className="text-lg mt-4 text-gray-800 dark:text-gray-300 max-w-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t(`subtitle`)}
          </motion.p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              variant="solid"
              color="primary"
              className="flex items-center gap-2"
              startContent={<MdOutlineTravelExplore />}
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
              startContent={<LuLogIn />}
            >
              <Link href="/signin">
                <span>{t(`loginBtn`)}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="page-wrapper py-12"><SearchBox /></div>
      </Suspense>
      <div className="bg-default-100 py-28 fira-go">
        <div className="page-wrapper mt-16 md:mt-0">
          <h2 className="text-4xl text-secondary lg:text-5xl font-bold lg:tracking-tight">
            {t(`aboutTitle`, { company: "HOPPLA" })}
          </h2>
          <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
            {t(`aboutDesc`)}
          </p>
        </div>
      </div>

      <OfferingsSection />
    </>
  );
  // return (
  //     <div className="bg-gray-900">

  //         <div className="relative isolate  z-10">
  //             <Image
  //                 src={carpoolBg}
  //                 alt=""
  //                 className="absolute inset-0 -z-10 h-full w-full object-cover"
  //             />
  //             <div className="page-wrapper pt-8">

  //                 <div className="text-center min-h-12 lg:min-h-80 flex flex-col justify-between ">
  //                     <h1 className="text-2xl font-bold tracking-tight text-white sm:text-5xl fira-go">
  //                         {t(`title`)}
  //                     </h1>
  //                     <div className="-mt-28 translate-y-32 lg:translate-y-8">
  //                         <SearchBox/>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // )
};

export default Hero;
