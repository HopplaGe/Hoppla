import {getRidesByDriver} from "@/lib/actions/rides/get";
import {auth} from "@/lib/auth";
import {cn} from "@/lib/utils";
import React, {Suspense} from "react";
import { BasicTable } from "@/components/shared/table/basic-table";
import { MyRideColumns } from "@/app/[locale]/(private)/dashboard/(with-stats)/rides/_components/MyRidesColumns";

const DashRides = async () => {
    const session = await auth();

    const user = session?.user;

    const myRides = await getRidesByDriver(user?.id!);

    return (
      <div>
        <ul
          className={cn("w-full grid grid-cols-1 gap-4 h-auto list-none z-10")}
        >
          <Suspense fallback={<div>Loading...</div>}>
            {myRides && (
              <BasicTable
                data={myRides}
                columns={MyRideColumns}
                options={false}
              />
            )}
          </Suspense>
        </ul>
      </div>
    );
};

export default DashRides;
