import {auth} from "@/lib/auth";
import MyVehicles from "@/components/shared/MyVehicles";
import {getCarByOwnerId} from "@/lib/actions/cars";

const Dashboard = async () => {
    const session = await auth();
    const user = session?.user;
    const {cars} = await getCarByOwnerId(user?.id as string)
    return (
        <div className="relative isolate overflow-hidden ">
            {/*{user?.name} -- {user?.email} <br/>*/}
            <MyVehicles cars={cars}/>
        </div>
    );
};

export default Dashboard;
