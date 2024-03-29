import React from "react";
// import {auth} from "@/lib/auth";
import AdminAsideComponents from "@/components/administration/AdminAsideComponents";

const AdminAside = async () => {
  // const session = await auth();
  // const user = session?.user;

  return (
    <aside className="fixed bottom-0 left-20 top-16 hidden xl:w-64 2xl:w-96 overflow-y-auto border-r border-gray-200 xl:block">
      <AdminAsideComponents props={""} />
    </aside>
  );
};

export default AdminAside;
