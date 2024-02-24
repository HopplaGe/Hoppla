"use client"
import React from 'react';
import {useArticles} from "@/hooks/articles/useArticles";
import Link from "next/link";
import {useTranslations} from "next-intl";

const BlogLinks = () => {
    const t = useTranslations("Footer");
    const {data: articles, isLoading, error} = useArticles();

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <h3 className="text-lg font-semibold leading-6 text-gray-900 fira-go">
                {t("Blog")}
            </h3>
            <ul role="list" className="mt-6 space-y-4">
                {articles?.map((article, index) => (
                    <li key={index}>
                        <Link
                            href={article.id}
                            className="text-sm leading-6 text-gray-600 hover:text-gray-900 fira-go"
                        >
                            {String(article.title).substring(0, 40) + '...'}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
        ;
};

export default BlogLinks;
