import DirectionsHeader from "@/components/rides/directions/DirectionsHeader";
import OfferFinishForm from "./_components/OfferFinishForm";

type pageProps = {
    searchParams?: { [key: string]: string | string[] | undefined };
};

const FinishPage = ({ searchParams }: pageProps) => {
    return (
        <div className="bg-white relative">
            <DirectionsHeader
                from={searchParams?.from as string}
                to={searchParams?.to as string}
            />
            <div className="page-wrapper py-10 bg-white z-20">
                <OfferFinishForm />
            </div>
        </div>
    );
};

export default FinishPage;