"use server";

import { z } from "zod";
import prisma from "../prisma";
import ArticleSchema from "../validation/ArticleSchema";
import { ArticleLanguage } from "@prisma/client";

export async function createArticle(article: z.infer<typeof ArticleSchema>) {
    const res = await prisma.article.create({
        data: {
            title: article.title,
            content: article.content,
            heading: article.heading,
            language: article.language,
            picture: article.picture,
            tags: {
                connectOrCreate: article.tags.map((tag) => ({
                    where: { name: tag },
                    create: { name: tag },
                })),
            },
        },
    });
    return res.id;
}

export async function updateArticle(
    id: string,
    article: z.infer<typeof ArticleSchema>
) {
    await prisma.article.update({
        where: { id },
        data: {
            title: article.title,
            content: article.content,
            heading: article.heading,
            language: article.language,
            picture: article.picture,
            tags: {
                set: [],
                connectOrCreate: article.tags.map((tag) => ({
                    where: { name: tag },
                    create: { name: tag },
                })),
            },
        },
    });
}

export async function deleteArticle(id: string) {
    await prisma.article.delete({ where: { id } });
}

export async function getArticles(
    tags: string[] = [],
    language?: ArticleLanguage
) {
    if (tags.length === 0 && !language)
        return await prisma.article.findMany({
            include: {
                tags: true,
            },
        });
    return await prisma.article.findMany({
        where: {
            ...(language ? { language } : {}),
            ...(tags.length > 0
                ? {
                      tags: {
                          some: {
                              name: {
                                  in: tags,
                              },
                          },
                      },
                  }
                : {}),
        },
        include: {
            tags: true,
        },
    });
}

export async function getArticle(id: string) {
    return await prisma.article.findUnique({
        where: { id },
        include: { tags: true },
    });
}

export async function getArticleTags() {
    return await prisma.articleTag.findMany();
}
