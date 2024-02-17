"use client"
import { Fragment, useState } from 'react'
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { cn } from '@/lib/utils'
import AddArea from './AddArea'
import { Button } from '@nextui-org/react'

const PageHeading = () => {

    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState('')

    const handleModal = (type: string) => {
        setOpen(true)
        setModalType(type)
    }

    return (
        <>
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight fira-go">
                        დასახლებული პუნქტები
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 fira-go">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            ქალაქი: <span className="ml-1 font-semibold text-gray-900">150</span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            დაბა: <span className="ml-1 font-semibold text-gray-900">35</span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            სოფელი: <span className="ml-1 font-semibold text-gray-900">2456</span>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">
                    <span className="sm:ml-3 fira-go flex gap-2">
                        <Button
                            onClick={() => handleModal('region')}
                            variant='light'
                            color='default'
                            size='lg'
                        >
                            რეგიონის დამატება
                        </Button>
                        <Button
                            onClick={() => handleModal('area')}
                            variant='solid'
                            color='secondary'
                            size='lg'
                        >
                            დასახლებული პუნქტის დამატება
                        </Button>
                    </span>
                </div>
            </div>
            <AddArea open={open} setOpen={setOpen} type={modalType} />
        </>
    )
}

export default PageHeading