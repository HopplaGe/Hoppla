import React, {FC} from 'react'
import CreateCompanyForm from "@/app/[locale]/(administration)/manage/companies/_components/CreateCompanyForm";

type pageProps = {}

const page: FC<pageProps> = () => {
    return (
        <div>
            <CreateCompanyForm/>
        </div>
    )
}

export default page