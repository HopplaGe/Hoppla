"use client";
import React, { FC } from "react";
import Table from "./Table";
import TableRow from "./TableRow";
import CompanySearch from "./CompanySearch";
import { useCompanies } from "@/hooks/companies/useCompanies";
import { Company } from "@prisma/client";
import { rideColumns } from "@/app/[locale]/(administration)/manage/rides/_components/RideColumns";
import BasicTable from "@/components/shared/table/basic-table";
import { companyColumns } from "@/app/[locale]/(administration)/manage/companies/_components/CompanyColumns";

const MainArea: FC = () => {
  const [companySearchQuery, setCompanySearchQuery] = React.useState("");

  const { data: companies, isLoading, isError } = useCompanies();
  console.log(companies);

  const filteredCompanies = companies?.filter((company) => {
    return company.name
      .toLowerCase()
      .includes(companySearchQuery.toLowerCase());
  }) as Company[];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 space-y-6">
      <BasicTable data={companies as any[]} columns={companyColumns} />
    </div>
  );
};

export default MainArea;
