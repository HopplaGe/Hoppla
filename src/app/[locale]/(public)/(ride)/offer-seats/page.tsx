import {FC} from "react";
import OfferSeatsForm from "@/components/rides/OfferSeatsForm";
import OfferSeatsFormTitle from "@/components/rides/OfferSeatsFormTitle";
import OfferSeatsBanner from "@/components/rides/OfferSeatsBanner";
import OfferInfoCards from "@/components/rides/OfferInfoCards";

const page: FC = () => {
    return (
        <div className="page-wrapper py-12 flex flex-col gap-16">
            {/*<OfferSeatsFormTitle/>*/}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <OfferSeatsForm/>
                <OfferSeatsBanner/>
            </section>
            <OfferInfoCards/>
        </div>
    );
};

export default page;