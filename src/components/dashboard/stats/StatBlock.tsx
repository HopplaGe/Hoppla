import React, { FC } from 'react'
import StatCard from './StatCard'
import { User } from '@prisma/client'
import { getStats } from '@/lib/actions/stats'
import { BarChart2} from 'lucide-react'

type StatBlockProps = {
    user: User
}

const StatBlock: FC<StatBlockProps> = async ({ user }) => {
    const stats = await getStats(user?.id!);
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    data={null}
                    color='light'
                    icon={<BarChart2 size={28} />}
                    percent={stat?.compare?.percent}
                    status={stat?.compare?.status}
                />
            ))}
        </div>
    )
}

export default StatBlock