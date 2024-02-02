import React from 'react';
import Image, {StaticImageData} from "next/image";
import {Button} from "@/components/ui/button";
import qrImage from '@/assets/banners/hoppla-qr.png'
import appleLogo from '@/assets/icons/apple-logo.svg'
import androidLogo from '@/assets/icons/android-logo.svg'

interface IInfoBlock {
    image: string | StaticImageData;
    title: string;
    subtitle: string;
}

const InfoBlock = ({image, title, subtitle}: IInfoBlock) => {
    return (
        <div className="relative h-auto bg-secondary px-8 overflow-hidden">

            <div className="page-wrapper h-full grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                <div className="col-span-1 lg:col-span-2 flex flex-col py-8 sm:items-center lg:items-start space-y-4">
                    <h1 className="text-white text-xl lg:text-4xl font-bold fira-go text-left sm:text-center lg:text-left">{title}</h1>
                    <p className="text-white text-xs md:text-sm lg:text-lg fira-go text-left sm:text-center lg:text-left">{subtitle}</p>
                    <div className="flex flex-row gap-4">
                        <Button size="lg"
                                className="flex items-center">
                            <Image src={appleLogo} alt="apple" width={18} height={18}/>
                            <span className="ml-2">App Store</span>
                        </Button>
                        <Button size="lg" className="flex items-center">
                            <Image src={androidLogo} alt="apple" width={18} height={18}/>
                            <span className="ml-2">Play Store</span>
                        </Button>
                    </div>
                </div>
                <div
                    className="relative col-span-1 lg:col-span-2 overflow-hidden pt-0 lg:pt-10 flex justify-center items-center">
                    <Image
                        src={qrImage}
                        alt={title}
                        width={200}
                        height={200}
                        className="absolute top-1/2 left-1/2 mt-10 transform -translate-x-1/2 -translate-y-1/2"
                    />
                    <Image
                        src={image}
                        alt={title}
                        width={300}
                        height={800}
                    />
                </div>
            </div>

        </div>
    );
};

export default InfoBlock;
