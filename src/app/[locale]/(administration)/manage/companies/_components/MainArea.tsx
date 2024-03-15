"use client";
import React from "react";
import { companyColumns } from "./CompanyColumns";
import { SimpleChevronsBreadCrumbs } from "@/components/shared/breadcrumb/simple-chevrons-breadcrumbs";
import { useTranslations } from "next-intl";
import { BasicTable } from "@/components/shared/table/basic-table";
import { useCompanies } from "@/hooks/companies/useCompanies";

const MainArea = () => {
  const t = useTranslations("Companies");

  const { data: companies, isLoading, isError } = useCompanies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 space-y-6 relative flex flex-col">
      <SimpleChevronsBreadCrumbs translations={t} />
      <BasicTable data={companies as any[]} columns={companyColumns} />
    </div>
  );
};

export default MainArea;
