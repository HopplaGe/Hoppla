import React from 'react';
import SearchBox from "@/components/partials/SearchBox";

const Carpool = () => {
    return (
        <main className="relative isolate z-10">
            <div className="page-wrapper">
                <SearchBox className="my-8"/>
            </div>
            {/*<InfoBlock image={phoneFrame} title={"ისიამოვნე მოგზაურობის უკეთესი გამოცდილებით, Hoopla-სთან ერთად."}*/}
            {/*           subtitle="იმოგზაურეთ საქართველოს ნებისმიერი მიმართულებით, მიიღეთ უახლესი ინფორმაცია და დაჯავშნეთ ბილეთები სმარტფონით."/>*/}
            <div className="page-wrapper">
                {/*<DailyRides/>*/}
            </div>
        </main>
    );
};

export default Carpool;

