import DirectionsHeader from "@/components/rides/directions/DirectionsHeader";
import OfferFinishForm from "./_components/OfferFinishForm";
import { auth } from "@/lib/auth";
import { getUserByEmail } from "@/lib/actions/users";
import { getCarByOwnerId } from "@/lib/actions/cars";

type pageProps = {
    searchParams?: { [key: string]: string | undefined };
};

const FinishPage = async ({ searchParams }: pageProps) => {

    const session = await auth()

    if (!session || !session.user) return null

    const user = await getUserByEmail(session?.user?.email as string)

    const cars = await getCarByOwnerId(user?.id as string)

    return (
        <div className="bg-white relative">
            <DirectionsHeader
                from={searchParams?.from as string}
                to={searchParams?.to as string}
            />
            <div className="page-wrapper py-10 bg-white z-20">
                <OfferFinishForm user={user} cars={cars} searchParams={searchParams!} />
            </div>
        </div>
    );
};

export default FinishPage;