import {auth} from "@/lib/auth";

const Dashboard = async () => {
    const session = await auth();
    const user = session?.user;
    return (
        <div className="relative isolate overflow-hidden ">
            {user?.name} -- {user?.email}
        </div>
    );
};

export default Dashboard;
