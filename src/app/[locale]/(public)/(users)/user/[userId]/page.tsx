import React from 'react';
import {getUserById} from "@/lib/actions/users";
import {ridesCountByDriver} from "@/lib/actions/stats";
import RatingsBlock from "@/app/[locale]/(public)/(users)/user/[userId]/_components/RatingsBlock";
import HeadingBlock from "@/app/[locale]/(public)/(users)/user/[userId]/_components/HeadingBlock";
import VerifyBlock from "@/app/[locale]/(public)/(users)/user/[userId]/_components/VerifyBlock";
import InfoBlock from "@/app/[locale]/(public)/(users)/user/[userId]/_components/InfoBlock";
import ReportBlock from "@/app/[locale]/(public)/(users)/user/[userId]/_components/ReportBlock";

type UserViewProps = {
    params: { userId: string }
}

const UserView = async ({params}: UserViewProps) => {

    const user = await getUserById(params.userId);

    const rides: number = await ridesCountByDriver(params.userId) as number;

    const verifiedId = false

    return (
        <div className="page-wrapper">
            <div className="page-wrapper w-full lg:w-1/2 max-w-7xl py-4 lg:py-8 flex flex-col fira-go divide-y-4">
                <HeadingBlock user={user}/>

                <RatingsBlock ratings={user?.Rated}/>

                <VerifyBlock user={user} verifiedId={verifiedId}/>

                <InfoBlock rides={rides} user={user}/>

                <ReportBlock/>

            </div>
        </div>
    );
};

export default UserView;
