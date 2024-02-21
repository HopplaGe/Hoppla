"use client";
import { deleteArticle } from "@/lib/actions/articles";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  articleId: string;
};

export default function DeleteButton({ articleId }: DeleteButtonProps) {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        if (confirm("Are you sure you want to delete this?")) {
          await deleteArticle(articleId);
          router.push("/blog");
        }
      }}
      color="warning"
      className=""
    >
      Delete
    </Button>
  );
}
