import {auth} from "@/lib/auth";

const Dashboard = async () => {
    const session = await auth();
    return (
        <div>
            {JSON.stringify(session)}
        </div>
    );
};

export default Dashboard;
