import { FC } from "react";
import BasicTable from "@/components/shared/table/basic-table";
import { getRides } from "@/lib/actions/rides/get";
import { rideColumns } from "./_components/RideColumns";

type pageProps = {};

const page: FC<pageProps> = async () => {
  const data = await getRides();

  return (
    <div>
      <div>
        <BasicTable data={data as any[]} columns={rideColumns} />
      </div>
    </div>
  );
};

export default page;
