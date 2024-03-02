import {FC} from "react";
import {Plus} from "lucide-react";
import MainStats from "@/components/administration/stats/MainStats";

import {rolePermissions} from "@/lib/tools/rolePermissions";
import {auth} from "@/lib/auth";
import AdminWidgets from "@/components/administration/widgets/AdminWidgets";

type pageProps = {}

const secondaryNavigation = [
    {name: 'Last 7 days', href: '#', current: true},
    {name: 'Last 30 days', href: '#', current: false},
    {name: 'All-time', href: '#', current: false},
]

const page: FC<pageProps> = async () => {
  const session = await auth();

  const user = session?.user;

  const permissions = rolePermissions(user?.role as string);
  // const parsedPermissions = permissions.can.map((item) => item)
  //
  // const canManage = parsedPermissions.includes('create:invoice')
  // //|| parsedPermissions.includes('read') || parsedPermissions.includes('update') || parsedPermissions.includes('delete')

  // console.log(permissions)

  return (
    <div className="relative">
      <MainStats />

      <AdminWidgets />
    </div>
  );
}

export default page;