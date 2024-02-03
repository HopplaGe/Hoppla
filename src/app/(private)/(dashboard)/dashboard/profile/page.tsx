import {FC} from "react";
import {getServerSession} from "next-auth";
import {getUserAuthProvider, getUserByEmail} from "@/lib/actions/user";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import EditProfileForm from "@/components/dashboard/forms/EditProfileForm";
import EditPasswordForm from "@/components/dashboard/forms/EditPasswordForm";

interface pageProps {
}


const page: FC<pageProps> = async () => {

    const session = await getServerSession()

    if (!session) return null

    const user = await getUserByEmail(session?.user?.email as string)

    const {...data} = await getUserAuthProvider(user?.id as string)

    return (
        <div className="page-wrapper h-auto pt-8 lg:flex lg:gap-x-16 lg:px-8 fira-go">
            <SidebarMenu/>
            <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
                <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">

                    <EditProfileForm user={user}/>

                    <EditPasswordForm user={user} provider={data.provider}/>

                </div>
            </main>
        </div>
    );
};

export default page;