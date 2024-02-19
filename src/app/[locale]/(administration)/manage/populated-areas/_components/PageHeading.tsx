"use client"
import {useCallback, useEffect, useMemo, useState} from 'react'
import AddArea from './AddArea'
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react'
//@ts-ignore
import {Country, PopulatedAreaStatus, Region} from '@prisma/client'
import {getCountries} from '@/lib/actions/countries'
import {useRouter} from 'next/navigation'

type PageHeadingProps = {
    regions: {
        id: string
        name: string
        status: string
        populatedAreas: any[]
    }[],
    setCountryId: (countryId: string) => void
}

const PageHeading = ({setCountryId, regions}: PageHeadingProps) => {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const [countries, setCountries] = useState<any>()
    const [cities, setCities] = useState(0)
    const [townships, setTownships] = useState(0)
    const [villages, setVillages] = useState(0)

    const [selectedKeys, setSelectedKeys] = useState("");

    const selectedValue = useMemo(
        () => {
            const country = countries?.find((country: Country) => country.id === selectedKeys);
            return country?.name;
        },
        [countries, selectedKeys]
    );


    const fetchCountries = useCallback(async () => {
        const countries = await getCountries();
        setCountries(countries)
    }, [])


    const areaCountReducer = useCallback((status: string) => {
        return regions?.map((region) => region.populatedAreas.filter((area: any) => area.status === status).length).reduce((a, b) => a + b, 0)
    }, [regions])


    useEffect(() => {
        setCities(areaCountReducer(PopulatedAreaStatus.CITY))
        setTownships(areaCountReducer(PopulatedAreaStatus.TOWNSHIP))
        setVillages(areaCountReducer(PopulatedAreaStatus.VILLAGE))
    }, [areaCountReducer])

    useEffect(() => {
        fetchCountries().then(r => r)
    }, [fetchCountries])

    const handleModal = (type: string) => {
        setOpen(true)
        setModalType(type)
    }

    const handleCountryChange = (country: string) => {
        setSelectedKeys(country);
        setCountryId(country)
        router.refresh()
    }

    return (
        <>
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1 flex flex-row gap-4 justify-start items-center">
                    <div className=''>
                        <h2 className="text-xl lg:text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight fira-go">
                            დასახლებული პუნქტები
                        </h2>
                        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 fira-go">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                ქალაქი: <span className="ml-1 font-semibold text-gray-900">{cities}</span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                დაბა: <span className="ml-1 font-semibold text-gray-900">{townships}</span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                სოფელი: <span className="ml-1 font-semibold text-gray-900">{villages}</span>
                            </div>
                        </div>
                    </div>
                    <div className='fira-go'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="flat"
                                    className="capitalize"
                                >
                                    {selectedValue || "საქ"}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="აირჩიეთ ქვეყანა"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                // @ts-ignore
                                onSelectionChange={
                                    // @ts-ignore
                                    (key: string) => handleCountryChange(key.anchorKey)
                                }
                            >
                                {countries?.map((country: Country) => (
                                    <DropdownItem
                                        key={country.id}
                                        className='fira-go'
                                    >
                                        {country.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                    <span className="sm:ml-3 fira-go flex flex-col md:flex-row gap-2 w-full">
                        <Button
                            onClick={() => handleModal('region')}
                            variant='flat'
                            color='default'
                            size='lg'
                            className='text-xs md:text-sm lg:text-baseo'
                        >
                            რეგიონის დამატება
                        </Button>
                        <Button
                            onClick={() => handleModal('area')}
                            variant='solid'
                            color='secondary'
                            size='lg'
                            className='text-xs md:text-sm lg:text-base'
                        >
                            პუნქტის დამატება
                        </Button>
                    </span>
                </div>
            </div>
            <AddArea open={open} setOpen={setOpen} type={modalType}/>
        </>
    )
}

export default PageHeading