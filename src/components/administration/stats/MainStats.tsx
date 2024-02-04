import React from 'react';
import {cn} from "@/lib/utils";
import {useTranslations} from "next-intl";

const stats = [
    {name: 'TotalUsers', value: '$405,091.00', change: '+4.75%', changeType: 'positive'},
    {name: 'TotalRides', value: '$12,787.00', change: '+54.02%', changeType: 'negative'},
    {name: 'TotalRevenue', value: '$245,988.00', change: '-1.39%', changeType: 'positive'},
    {name: 'TotalCashOuts', value: '$30,156.00', change: '+10.18%', changeType: 'negative'},
]

const MainStats = () => {
    const t = useTranslations('Admin.MainStats');
    return (
        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
            <dl className="mx-auto grid max-w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0 bg-white">
                {stats.map((stat, statIdx) => (
                    <div
                        key={stat.name}
                        className={cn(
                            statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                            'flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8'
                        )}
                    >
                        <dt className="text-sm font-medium leading-6 text-gray-500 fira-go">{t(`${stat.name}`)}</dt>
                        <dd
                            className={cn(
                                stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
                                'text-xs font-medium'
                            )}
                        >
                            {stat.change}
                        </dd>
                        <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                            {stat.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

export default MainStats;
