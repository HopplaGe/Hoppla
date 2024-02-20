import React from "react";
import { LayoutProps } from "@/types/layoutProps";
import StatBlock from "@/components/dashboard/stats/StatBlock";
import { auth } from "@/lib/auth";
import { User } from "@prisma/client";

const PrivateLayout = async ({ children }: LayoutProps) => {
    const session = await auth();
    const user = session?.user;
    return (
        <div className="flex flex-col gap-4">
            <StatBlock user={user as unknown as User} />
            {children}
        </div>
    );
};

export default PrivateLayout;
