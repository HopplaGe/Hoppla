"use client";
import React, { FC } from "react";
import Table from "./Table";
import TableRow from "./TableRow";
import CompanySearch from "./CompanySearch";
import { useCompanies } from "@/hooks/companies/useCompanies";
import { Company } from "@prisma/client";

const MainArea: FC = () => {
  const [companySearchQuery, setCompanySearchQuery] = React.useState("");

  const { data: companies, isLoading, isError } = useCompanies();

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
      <CompanySearch setCompanySearchQuery={setCompanySearchQuery} />
      <Table>
        {filteredCompanies?.map((company) => (
          <TableRow key={company.id} item={company} />
        ))}
      </Table>
    </div>
  );
};

export default MainArea;
