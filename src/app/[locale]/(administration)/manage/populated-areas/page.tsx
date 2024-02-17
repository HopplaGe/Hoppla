import React, { FC } from 'react'
import PageHeading from './_components/PageHeading'

type pageProps = {
}

const page: FC<pageProps> = () => {
    return (
        <div className="w-full max-w-full grow lg:flex xl:px-2">
            
            <div className="flex-1 xl:flex">
            
                <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 h-screen">
                    <PageHeading />
                    main
                </div>
            </div>

            <div className="shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
                right
            </div>
        </div>
    )
}

export default page