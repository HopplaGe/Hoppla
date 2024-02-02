"use client";
import React from 'react';
import {CheckIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

const steps = [
    {
        id: '01',
        name: 'მიმართულება',
        description: 'დანიშნულების ადგილი და მგზავრთა რაოდენობა განისაზღვრა.',
        href: '#',
        status: 'complete'
    },
    {
        id: '02',
        name: 'საბოლოო დეტალები',
        description: 'დააზუსტეთ ფასი, გაჩერებები და დასაშვები ქმედებები.',
        href: '#',
        status: 'current'
    }
]

const AddTripSteps = () => {

    const router = useRouter()

    return (
        <div className="lg:border-b lg:border-t lg:border-gray-200 bg-white">
            <nav className="max-w-full" aria-label="Progress">
                <ol
                    role="list"
                    className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
                >
                    {steps.map((step, stepIdx) => (
                        <li key={step.id} className="relative overflow-hidden lg:flex-1">
                            <div
                                className={cn(
                                    stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
                                    stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '',
                                    'overflow-hidden border border-gray-200 lg:border-0'
                                )}
                            >
                                {step.status === 'complete' ? (
                                    <button className="group" onClick={() => router.back()}>
                                        <span
                                            className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                                            aria-hidden="true"
                                        />
                                        <span
                                            className={cn(
                                                stepIdx !== 0 ? 'lg:pl-9' : '',
                                                'flex items-start px-6 py-5 text-sm font-medium'
                                            )}
                                        >
                                              <span className="flex-shrink-0">
                                                <span
                                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-600">
                                                  <CheckIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                                </span>
                                              </span>
                                              <span className="ml-4 mt-0.5 flex min-w-0 flex-col items-start">
                                                <span className="text-sm font-medium fira-go">{step.name}</span>
                                                <span
                                                    className="text-[10px] fira-go font-medium text-gray-500 text-left">{step.description}</span>
                                              </span>
                                        </span>
                                    </button>
                                ) : (
                                    <div aria-current="step">
                                        <span
                                            className="absolute left-0 top-0 h-full w-1 bg-primary lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                                            aria-hidden="true"
                                        />
                                        <span
                                            className={cn(
                                                stepIdx !== 0 ? 'lg:pl-9' : '',
                                                'flex items-start px-6 py-5 text-sm font-medium'
                                            )}
                                        >
                                              <span className="flex-shrink-0">
                                                <span
                                                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                                                  <span className="text-primary">{step.id}</span>
                                                </span>
                                              </span>
                                              <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                                                <span
                                                    className="text-sm font-medium text-primary fira-go">{step.name}</span>
                                                <span
                                                    className="text-[10px] fira-go font-medium text-gray-500">{step.description}</span>
                                              </span>
                                        </span>
                                    </div>
                                )}

                                {stepIdx !== 0 ? (
                                    <>
                                        {/* Separator */}
                                        <div className="absolute inset-0 left-0 top-0 hidden w-3 lg:block"
                                             aria-hidden="true">
                                            <svg
                                                className="h-full w-full text-gray-300"
                                                viewBox="0 0 12 82"
                                                fill="none"
                                                preserveAspectRatio="none"
                                            >
                                                <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor"
                                                      vectorEffect="non-scaling-stroke"/>
                                            </svg>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default AddTripSteps;
