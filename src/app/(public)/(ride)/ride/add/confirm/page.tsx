import * as React from "react";
import RideConfirmForm from "@/components/rides/forms/RideConfirmForm";
import {getServerSession} from "next-auth";
import {getCarByOwner} from "@/lib/actions/cars";
import {getUserByEmail} from "@/lib/actions/user";

const AddPageConfirm = async ({searchParams}: {
    searchParams: {
        from: string,
        to: string,
        distance: number,
        duration: number,
        price: string,
        seats: number,
    }
}) => {

    const session = await getServerSession()

    if (!session || !session.user) return null

    const user = await getUserByEmail(session?.user?.email as string)

    const cars = await getCarByOwner(user?.id as string)

    return (
        <>
            <main
                className="page-wrapper flex flex-col-reverse lg:flex lg:min-h-full lg:flex-row-reverse gap-4 p-4 lg:p-8">
                <RideConfirmForm
                    user={user}
                    // @ts-ignore
                    cars={cars}
                    searchParams={searchParams}
                />
            </main>
        </>
    );
};

export default AddPageConfirm;
