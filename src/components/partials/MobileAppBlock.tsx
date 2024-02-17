"use client";
import React from 'react';
import Image, { StaticImageData } from "next/image";
import qrImage from '@/assets/images/banners/hoppla-qr.png'
import appleLogo from '@/assets/images/icons/apple-logo.svg'
import androidLogo from '@/assets/images/icons/android-logo.svg'
import { motion } from "framer-motion";
import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import phoneFrame from '@/assets/images/phone-frame.svg'

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
                    <h1 className="text-white text-xl lg:text-4xl font-bold fira-go text-left sm:text-center lg:text-left">{t(`title`)}</h1>
                    <p className="text-white text-xs md:text-sm lg:text-lg fira-go text-left sm:text-center lg:text-left">{t(`subtitle`)}</p>
                    <div className="flex flex-row gap-4 fira-go">
                        <Button
                            size="lg"
                            variant='solid'
                            color='primary'
                            className="flex items-center">
                            <Image src={appleLogo} alt="apple" width={18} height={18} />
                            <span className="ml-2">App Store</span>
                        </Button>
                        <Button
                            variant='solid'
                            color='primary'
                            size="lg"
                            className="flex items-center">
                            <Image src={androidLogo} alt="apple" width={18} height={18} />
                            <span className="ml-2">Play Store</span>
                        </Button>
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
                    <Image
                        src={phoneFrame}
                        alt={t(`title`)}
                        width={300}
                        height={800}
                    />
                </motion.div>
            </div>

        </motion.div>
    );
};

export default MobileAppBlock;