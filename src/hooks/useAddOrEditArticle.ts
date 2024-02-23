"use client";
import { createArticle, updateArticle } from "@/lib/actions/articles";
import ArticleSchema from "@/lib/validation/ArticleSchema";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
// import { redirect } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export function useAddOrEditArticle() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const onSubmit = async (
    values: z.infer<typeof ArticleSchema>,
    articleId?: string
  ) => {
    setSubmitting(true);
    if (!articleId) {
      const articleId = await createArticle(values);
      router.push("/blog/" + articleId);
    } else {
      await updateArticle(articleId, values);
      router.push("/blog/" + articleId);
    }
    setSubmitting(false);
    // redirect("/blog/" + articleId);
  };

  return {
    submitting,
    onSubmit,
  };
}
