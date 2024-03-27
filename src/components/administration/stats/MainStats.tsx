"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { StatCard } from "@/components/hoppla";
import { BarChart2 } from "lucide-react";
import { useAllStats } from "@/hooks/statistics/useAllStats";

const MainStats = () => {
  const t = useTranslations("Admin.MainStats");

  const { data: stats, isLoading, error } = useAllStats();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="inline-grid grid-cols-1 p-2 gap-4 w-full">
      {stats &&
        stats.map((stat, statIdx) => (
          <StatCard
            key={statIdx}
            title={t(`${stat.name}`)}
            value={stat.value ?? ""}
            icon={BarChart2}
            color="white"
            rounded="lg"
            percent={stat.change}
            status={stat.changeType === "negative" ? "decrease" : "increase"}
          />
        ))}
    </div>
  );
};

export default MainStats;
