import React from 'react';
import Image from "next/image";
import noData from "@/assets/banners/no-data.svg";

const RidesNotFound = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-col items-center justify-center px-8 mt-0 col-span-2">
            <div className="w-full">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 fira-go">მსუბუქი
                    ავტომობილები ამ
                    თარიღისთვის ვერ
                    მოიძებნა</h1>
                <p className="text-gray-600">გთხოვთ აირჩიოთ სხვა თარიღი</p>
            </div>
            <Image src={noData} alt={"No Data Image"} width={600} height={600} priority={false}
            />
        </div>

    );
};

export default RidesNotFound;
