import { getArticle } from "@/lib/actions/articles";
import AddOrEditArticleForm from "../../_components/AddOrEditArticleForm";

type pageProps = {
  params: {
    locale: string;
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({ params, searchParams }: pageProps) {
  const article = await getArticle(params.id);

  if (!article) {
    return (
      <div className="page-wrapper my-10 text-center text-3xl">
        <h1>Blog not found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8">Edit Article</h1>
      <AddOrEditArticleForm article={article} />
    </div>
  );
}
