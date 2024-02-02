import {cn} from "@/lib/utils";
import {getStats} from "@/lib/actions/stats";

const DashboardStats = async ({userId}: { userId: string }) => {
    const stats = await getStats(userId)

    return (
        <div className="bg-white rounded-xl border border-gray-100 mt-6 lg:mt-0">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={cn(
                            index % 2 === 1 ? 'sm:border-l' : index === 2 ? 'lg:border-l' : '',
                            'flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8'
                        )}
                    >
                        <dt className="text-sm font-medium leading-6 text-gray-500">{stat.title}</dt>
                        <dd
                            className={cn(
                                'text-xs font-medium text-gray-700',
                                stat.compare?.status === 'decrease' && 'text-rose-600',
                                stat.compare?.status === 'increase' && 'text-emerald-600'
                            )}
                        >
                            {stat.compare?.percent}
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

export default DashboardStats;
