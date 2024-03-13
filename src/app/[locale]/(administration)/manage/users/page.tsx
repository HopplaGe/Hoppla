import { useUsers } from "@/hooks/users/useUsers";
import UsersTable from "./_components/UsersTable";

type ManageUsersProps = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function ManageUsers({
    params,
    searchParams,
}: ManageUsersProps) {
    return (
        <div className="p-5 space-y-4">
            <h1>Manage Users</h1>
            <UsersTable />
        </div>
    );
}
