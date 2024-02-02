import React from 'react';
import SearchBox from "@/components/partial/SearchBox";

const Minibus = () => {
    return (
        <div className="relative isolate z-10">
            <SearchBox className="page-wrapper my-8" type="minibus"/>
            <div className="page-wrapper">
                <h2 className="text-base font-semibold leading-6 text-gray-900 fira-go">მინიბუსები</h2>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                    <div
                        className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">

                        <div>...</div>
                    </div>
                    <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                        დდ
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Minibus;
