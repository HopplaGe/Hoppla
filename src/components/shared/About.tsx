"use client"
import {useTranslations} from 'next-intl';
import React from 'react'

const About = () => {

    const t = useTranslations("Hero");

    return (
        <>
            <h2 className="text-xl md:text-4xl text-secondary lg:text-5xl font-bold lg:tracking-tight">
                {t(`aboutTitle`, {company: "HOPPLA"})}
            </h2>
            <p className="text-xs md:text-md lg:text-lg mt-4 text-gray-600 dark:text-gray-300">
                {t(`aboutDesc`)}
            </p>
        </>
    )
}

export default About