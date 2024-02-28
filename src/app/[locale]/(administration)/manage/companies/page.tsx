import React, {FC} from 'react'
import CreateCompanyForm from "./_components/CreateCompanyForm";
import CompanyStatsBlock from "./_components/CompanyStatsBlock";
import MainArea from "./_components/MainArea";
import Sidebar from "./_components/Sidebar";

type PageProps = {}


const Page: FC<PageProps> = () => {
    return (
        <div className="mx-auto w-full h-full grow lg:flex">
            {/* Left sidebar & main wrapper */}
            <div className="flex-1 xl:flex">
                <Sidebar/>
                <MainArea/>
            </div>
            <CompanyStatsBlock/>
        </div>
    )
}

export default Page