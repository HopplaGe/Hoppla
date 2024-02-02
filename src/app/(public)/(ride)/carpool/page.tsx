import SearchBox from "@/components/partials/SearchBox";
import InfoBlock from "@/components/shared/InfoBlock";
import phoneFrame from '@/assets/images/phone-frame.svg'
import DailyRides from "@/components/rides/DailyRides";

const CarPool = async () => {
    return (
        <main className="relative isolate z-10">
            <div className="page-wrapper">
                <SearchBox className="my-8" type="carpool"/>
            </div>
            <InfoBlock image={phoneFrame} title={"ისიამოვნე მოგზაურობის უკეთესი გამოცდილებით, Hoopla-სთან ერთად."}
                       subtitle="იმოგზაურეთ საქართველოს ნებისმიერი მიმართულებით, მიიღეთ უახლესი ინფორმაცია და დაჯავშნეთ ბილეთები სმარტფონით."/>
            <div className="page-wrapper">
                <DailyRides/>
            </div>
        </main>
    );
};

export default CarPool;