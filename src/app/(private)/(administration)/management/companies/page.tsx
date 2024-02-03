import {FC} from "react";
import {cn} from "@/lib/utils";
import {getCompanies} from "@/lib/actions/companies";
import CompanyTables from "@/components/administration/tables/CompanyTables";

interface pageProps {
}

const page: FC<pageProps> = async () => {

    const companies = await getCompanies();

    return (
        <div className="flex flex-col">
            <div className={cn("px-4  bg-white rounded-xl shadow-md")}>
                Company
            </div>
            <div className={cn("mt-12 fira-go")}>
                <CompanyTables companies={companies}/>
            </div>
        </div>
    );
}

export default page;