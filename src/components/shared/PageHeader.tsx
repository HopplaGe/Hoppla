import React from 'react';
import Image from "next/image";
import {IPageHeader} from "@/interfaces/IPageHeader";

const PageHeader = ({image, title}: IPageHeader) => {
    return (
        <div className="relative">
            <Image
                src={image}
                alt={title}
                className="h-24 md:h-40 lg:h-52 inset-0 -z-10 w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"/>
            <div className="absolute inset-0 flex justify-center items-center">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white fira-go">{title}</h1>
            </div>
        </div>
    );
};

export default PageHeader;
