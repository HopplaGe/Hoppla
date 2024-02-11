import {useTranslations} from "next-intl";
import Hero from "@/components/partials/Hero";

export default function Index() {
    const t = useTranslations("Index");


    return (
        <>
            <Hero/>
            <div className="page-wrapper py-16">
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
                <h1>{t(`title`)}</h1>
            </div>
        </>
    );
}
