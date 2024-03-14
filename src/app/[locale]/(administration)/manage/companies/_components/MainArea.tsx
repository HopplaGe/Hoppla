"use client";
import React from "react";

import { useCompanies } from "@/hooks/companies/useCompanies";
import { Company } from "@prisma/client";
import { companyColumns } from "@/app/[locale]/(administration)/manage/companies/_components/CompanyColumns";
import { SimpleChevronsBreadCrumbs } from "@/components/shared/breadcrumb/simple-chevrons-breadcrumbs";
import { useTranslations } from "next-intl";
import { BasicTable } from "@/components/shared/table/basic-table";

const MainArea = () => {
  const t = useTranslations("Companies");
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
      <SimpleChevronsBreadCrumbs translations={t} />
      <BasicTable data={companies as any[]} columns={companyColumns} />
    </div>
  );
};

export default MainArea;
