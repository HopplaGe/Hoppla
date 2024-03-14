"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import PageHeading from "./_components/PageHeading";
import Regions from "./_components/Regions";
import { Region } from "@prisma/client";
import { getCountry } from "@/lib/actions/countries";
import { BasicTable } from "@/components/shared/table/basic-table";
import { regionColumns } from "./_components/regionColumns";

const PopulatedAreas = () => {
  const [countryId, setCountryId] = useState<string>(
    "clszi1mcd0000g68ohiakkbf4",
  );
  const [country, setCountry] = useState<any>({});

  const fetchCountry = useCallback(async () => {
    const country = await getCountry(countryId);
    setCountry(country);
  }, [countryId]);

  useEffect(() => {
    fetchCountry().then((r) => r);
  }, [fetchCountry]);

  return (
    <div className="w-full max-w-full grow lg:flex xl:px-2">
      <div className="flex-1 xl:flex">
        <div className="w-full px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 h-screen flex flex-col gap-4 md:gap-8">
          <PageHeading
            setCountryId={setCountryId}
            regions={country?.regions as any[]}
          />
          <Suspense fallback={<div>Loading...</div>}>
            {/*<Regions regions={country?.regions as Region[]}/>*/}
            <BasicTable
              data={country?.regions as Region[]}
              columns={regionColumns}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PopulatedAreas;
