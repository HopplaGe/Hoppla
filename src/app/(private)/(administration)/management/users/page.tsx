import {FC} from "react";
import UserChart from "@/components/administration/charts/UserChart";
import {getUsers} from "@/lib/actions/user";
import {getStatsAdmin} from "@/lib/actions/stats";
import {cn} from "@/lib/utils";
import UserTables from "@/components/administration/tables/UserTables";

interface pageProps {
}

const page: FC<pageProps> = async () => {

    const users = await getUsers();

    const statistics = await getStatsAdmin();

    return (
        <div className="flex flex-col w-full h-full">
            <div className={cn("px-4  bg-white rounded-xl shadow-md")}>
                <UserChart statistics={statistics}/>
            </div>
            <div className={cn("mt-12 fira-go")}>
                <UserTables users={users}/>
            </div>
        </div>
    );
}

export default page;