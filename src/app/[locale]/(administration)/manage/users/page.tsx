"use client"
import React from 'react';
import {useTranslations} from "next-intl";
import {SimpleChevronsBreadCrumbs} from "@/components/shared/breadcrumb/simple-chevrons-breadcrumbs";
import PageWrapper from "@/components/administration/PageWrapper";
import {BasicTable} from "@/components/shared/table/basic-table";
import {useUsers} from "@/hooks/users/useUsers";
import {userColumns} from "./_components/UserColumns";

const UsersManager = () => {
    const t = useTranslations("Users");

    const {data, isLoading, error} = useUsers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error...</div>;
    }

    // console.log(data)

    return (
      <PageWrapper>
        <SimpleChevronsBreadCrumbs translations={t} />
        <div>
          <BasicTable data={data as any[]} columns={userColumns} />
        </div>
      </PageWrapper>
    );
};

export default UsersManager;
