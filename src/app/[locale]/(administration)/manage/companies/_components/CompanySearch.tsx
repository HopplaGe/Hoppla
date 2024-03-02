import React from "react";
import { Button, Input } from "@nextui-org/react";
import { ArrowDownAZ, Search } from "lucide-react";

type CompanySearchProps = {
    setCompanySearchQuery: (query: string) => void;
}

const CompanySearch = ({setCompanySearchQuery}: CompanySearchProps) => {
  return (
    <div>
      <Input
        placeholder="კომპანიის ძებნა"
        size="sm"
        className="w-full fira-go text-xs placeholder:text-xs"
        onValueChange={(value) => setCompanySearchQuery(value)}
        startContent={<Search size={16} />}
        endContent={
            <div className="flex items-center gap-x-2">
                <Button
                    size="sm"
                    variant="light"
                    className="text-xs"
                    endContent={<ArrowDownAZ size={16} />}
                >
                    ფილტრი
                </Button>
            </div>
        }
      />
    </div>
  );
};

export default CompanySearch;
