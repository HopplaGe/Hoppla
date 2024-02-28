import React, {FC} from "react";
import CompanyActions from "@/app/[locale]/(administration)/manage/companies/_components/CompanyActions";

const Sidebar: FC = () => (
    <div
        className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6 bg-default-100">
        <CompanyActions/>
    </div>
)

export default Sidebar