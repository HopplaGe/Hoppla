"use client"
import React, {FC} from 'react'
import StatCard from './StatCard'
import {User} from '@prisma/client'
import {BarChart2} from 'lucide-react'
import {useUserStats} from "@/hooks/statistics/useUserStats";

type StatBlockProps = {
    user: User
}

const StatBlock: FC<StatBlockProps> = ({user}) => {

    const {data: stats, isLoading, error} = useUserStats(user)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2'>
            {stats?.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    data={null}
                    color='light'
                    icon={<BarChart2 size={28}/>}
                    percent={stat?.compare?.percent}
                    status={stat?.compare?.status}
                />
            ))}
        </div>
    )
}

export default StatBlock