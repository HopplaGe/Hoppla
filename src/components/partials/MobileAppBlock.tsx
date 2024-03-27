"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import qrImage from "@/assets/images/qr-code.svg";
import appleLogo from "@/assets/images/icons/apple-logo.svg";
import androidLogo from "@/assets/images/icons/android-logo.svg";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import phoneFrame from "@/assets/images/phone-frame.svg";
import Link from "next/link";

interface IInfoBlock {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
}

const MobileAppBlock = () => {
  const t = useTranslations("MobileAppBlock");
  return (
    <motion.div className="relative h-auto bg-secondary px-8 overflow-hidden">
      <div className="page-wrapper h-full grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <div className="col-span-1 lg:col-span-2 flex flex-col py-8 sm:items-center lg:items-start space-y-4">
          <h1 className="text-white text-xl lg:text-4xl font-bold fira-go text-left sm:text-center lg:text-left">
            {t(`title`)}
          </h1>
          <p className="text-white text-xs md:text-sm lg:text-lg fira-go text-left sm:text-center lg:text-left">
            {t(`subtitle`)}
          </p>
          <div className="flex flex-row gap-4 fira-go">
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <Link
                href="#"
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark hoppla-animation focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  className="me-3 w-7 h-7"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-xs">Download on the</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    App Store
                  </div>
                </div>
              </Link>
              <Link
                href="#"
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark focus:ring-0 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  className="me-3 w-7 h-7"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google-play"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                  ></path>
                </svg>
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-xs">Get in on</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    Google Play
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <motion.div
          className="relative col-span-1 lg:col-span-2 overflow-hidden pt-0 lg:pt-10 flex justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Image
            src={qrImage}
            alt={t(`title`)}
            width={200}
            height={200}
            className="absolute top-1/2 left-1/2 mt-10 transform -translate-x-1/2 -translate-y-1/2"
          />
          <Image src={phoneFrame} alt={t(`title`)} width={300} height={800} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileAppBlock;
