import AddOrEditArticleForm from "../_components/AddOrEditArticleForm";

type pageProps = {};

export default function page({}: pageProps) {
  return (
    <div>
      <h1 className="mb-8">Add Article</h1>
      <AddOrEditArticleForm />
    </div>
  );
}
