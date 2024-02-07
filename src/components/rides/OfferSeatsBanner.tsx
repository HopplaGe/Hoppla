import React from 'react';
import carPoolBg from "@/assets/images/banners/carpool.svg";

const OfferSeatsBanner = () => {
    return (
        <div className="hidden lg:block lg:col-span-2">
            <div className="bg-contain bg-center bg-no-repeat h-96" style={{
                backgroundImage: `url(${carPoolBg.src})`
            }}/>
        </div>
    );
};

export default OfferSeatsBanner;
