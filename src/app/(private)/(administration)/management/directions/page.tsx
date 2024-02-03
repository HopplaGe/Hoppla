import {FC} from "react";
import {cn} from "@/lib/utils";
import DirectionsForm from "@/components/administration/forms/DirectionsForm";

interface pageProps {
}

const page: FC<pageProps> = async () => {


    return (
        <div className="flex flex-col w-full h-full">
            <div className={cn("px-4  bg-white rounded-xl shadow-md")}>
                <DirectionsForm/>
            </div>
            <div className={cn("mt-12 fira-go")}>
                ..
            </div>
        </div>
    );
}

export default page;