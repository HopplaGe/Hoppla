import { useState } from "react";
import { CompanyStatus } from "@prisma/client";

interface Company {
    id: string;
    name: string;
    logo: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    website: string | null;
    ownerId: string;
    status: CompanyStatus;
    createdAt: Date;
    updatedAt: Date;
    [key: string]: any; // Add index signature
}

const useSort = (companies: Company[]) => {

    const [sortedCompanies, setSortedCompanies] = useState<Company[]>(companies);

    const sortCompanies = (field: string) => {
        const sorted = [...sortedCompanies].sort((a, b) => {
            if (a[field] < b[field]) {
                return -1;
            }
            if (a[field] > b[field]) {
                return 1;
            }
            return 0;
        });

        setSortedCompanies(sorted);
    };

    return { sortedCompanies, sortCompanies };
};

export default useSort;