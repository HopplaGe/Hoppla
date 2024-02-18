"use server"

import { z } from "zod";
import prisma from "../prisma"
import ArticleSchema from "../validation/ArticleSchema";

export async function createArticle(article: z.infer<typeof ArticleSchema>) {
    await prisma.article.create({
        data: {
            title: article.title,
            content: article.content,
            heading: article.heading,
            language: article.language,
            picture: article.picture,
            tags: {
                connectOrCreate: article.tags.map((tag) => ({
                    where: { name: tag },
                    create: { name: tag }
                }))
            }
        }
    });
}

export async function updateArticle(id: string, article: z.infer<typeof ArticleSchema>) {
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
                    create: { name: tag }
                }))
            }
        }
    });
}

export async function deleteArticle(id: string) {
    await prisma.article.delete({ where: { id } });
}

export async function getArticles() {
    return await prisma.article.findMany();
}

export async function getArticle(id: string) {
    return await prisma.article.findUnique({ where: { id } });
}

export async function getArticleTags() {
    return await prisma.articleTag.findMany();
}
