import React, {FC} from 'react';
import SearchBox from "@/components/partials/SearchBox";
import {auth} from "@/lib/auth";
import {Link} from "@/i18n/navigation";

interface pageProps {
}

const page: FC<pageProps> = async () => {
    const session = await auth();
    // console.log("carpool session", session); // console log to read session

    const user = session?.user;

    return (
        <main className="relative isolate z-10">
            <div className="page-wrapper">
                <SearchBox className="my-8"/>
            </div>
            {/*<InfoBlock image={phoneFrame} title={"ისიამოვნე მოგზაურობის უკეთესი გამოცდილებით, Hoopla-სთან ერთად."}*/}
            {/*           subtitle="იმოგზაურეთ საქართველოს ნებისმიერი მიმართულებით, მიიღეთ უახლესი ინფორმაცია და დაჯავშნეთ ბილეთები სმარტფონით."/>*/}
            <div className="page-wrapper">
                <div>{user?.name} --</div>
                {/*<DailyRides/>*/}
                <Link href={"/dashboard"}>
                    Dashboard
                </Link>
                <Link href={"/carpool"}>
                    Dashboard
                </Link>
            </div>
        </main>
    );
};

export default page;

