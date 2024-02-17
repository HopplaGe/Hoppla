import {auth} from "@/lib/auth";
import MyVehicles from "@/components/shared/MyVehicles";
import {getCarByOwnerId} from "@/lib/actions/cars";
import StatBlock from "@/components/dashboard/stats/StatBlock";
import { User } from "@prisma/client";

const Dashboard = async () => {
    const session = await auth();
    const user = session?.user;
    const {cars} = await getCarByOwnerId(user?.id as string)
    return (
        <div className="relative isolate overflow-hidden flex flex-col gap-6">
            <MyVehicles cars={cars}/>
        </div>
    );
};

export default Dashboard;