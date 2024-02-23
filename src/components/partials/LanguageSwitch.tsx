"use client";
import {localeLabels, locales} from "@/i18n/locales";
import {useLocale, useTranslations} from "next-intl";
import {useRouter, usePathname} from "@/i18n/navigation";
import {useSearchParams} from "next/navigation";

import {useMounted} from "@/hooks/useMounted";
import {Select, SelectItem} from "@nextui-org/react";
import React from "react";

type Locale = keyof typeof localeLabels;

export default function LanguageSwitch() {
    const mounted = useMounted();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const locale = useLocale();
    const t = useTranslations("LanguageSwitch");

    if (!mounted) return null;

    const handleClick = (e: any) => {
        router.replace(`${pathname}?${searchParams.toString()}`, {
            locale: e.target.value,
        });
    };

    return (
        <div>
            <Select
                size="sm"
                className="w-44 fira-go -z-0"
                variant="flat"
                defaultSelectedKeys={[locale]}
                onChange={handleClick}
                label={t("choose-language")}
            >
                {(locales ?? []).map((locale) => (
                    <SelectItem key={locale} value={locale}>
                        {localeLabels[locale as Locale]}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}
