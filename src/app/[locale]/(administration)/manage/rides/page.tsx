"use client";
import { getRides } from "@/lib/actions/rides/get";
import { rideColumns } from "./_components/RideColumns";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { SimpleChevronsBreadCrumbs } from "@/components/shared/breadcrumb/simple-chevrons-breadcrumbs";
import { BasicTable } from "@/components/shared/table/basic-table";

const RidesManager = () => {
  const t = useTranslations("Rides");
  const [rides, setRides] = useState<any[]>([]);

  const fetchRides = useCallback(async () => {
    const rides = await getRides();
    setRides(rides || []);
  }, []);

  useEffect(() => {
    fetchRides().then((r) => r);
  }, [fetchRides]);

  return (
    <div
      className={cn(
        "px-4",
        "py-6",
        "sm:px-6",
        "lg:pl-8",
        "xl:flex-1",
        "xl:pl-6",
        "space-y-6",
      )}
    >
      <SimpleChevronsBreadCrumbs translations={t} />
      <div>
        <BasicTable data={rides as any[]} columns={rideColumns} />
      </div>
    </div>
  );
};

export default RidesManager;
