import { getArticle } from "@/lib/actions/articles";
import MarkdownPreview from "./_components/MarkdownPreview";
// import Image from "next/image";
import moment from "moment";
import "moment/locale/ka";
import { Button, Image } from "@nextui-org/react";
import { auth } from "@/lib/auth";
import Link from "next/link";
import DeleteButton from "./_components/DeleteButton";

type pageProps = {
  params: {
    locale: string;
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({ params, searchParams }: pageProps) {
  const blog = await getArticle(params.id);
  const session = await auth();
  if (!blog) {
    return (
      <div className="page-wrapper my-10 text-center text-3xl">
        <h1>Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="page-wrapper fira-go mt-10 w-full">
      {/* go back */}
      <div className="flex gap-2 mb-10">
        <DeleteButton articleId={blog.id} />
        <Button color="secondary" className="">
          <Link href="/blog">Go Back</Link>
        </Button>
        {session?.user.role === "ADMIN" && (
          <Button>
            <Link href={`/articles/edit/${blog.id}`}>Edit</Link>
          </Button>
        )}
      </div>
      <h1 className="text-5xl" data-astro-transition-scope="astro-X4J6SPKD-2">
        {blog.title}
      </h1>
      <img
        src={blog.picture!}
        alt=""
        // width={1000}
        // height={500}
        // layout="responsive"
        className="mt-10 rounded-xl h-[500px] object-cover w-full max-w-full"
      />
      {/* heading */}
      <h2 className="text-xl mt-10 text-center text-gray-600">
        {blog.heading}
      </h2>
      <hr className="my-5" />
      {/* tags */}
      <div className="flex justify-between gap-5 mb-10">
        <div className="flex gap-3">
          {blog.tags.map(({ name }, index) => (
            <span key={index} className="text-xs bg-gray-200 p-2 rounded-md">
              #{name}
            </span>
          ))}
        </div>

        <div>
          <span className="text-gray-500 text-xs">
            {moment(blog.createdAt).format("Do MMMM YYYY")}
          </span>
        </div>
      </div>
      <MarkdownPreview source={blog.content} />

      <div className="flex flex-col lg:flex-row gap-5 justify-between bg-white p-5 rounded-xl my-10">
        <div>
          <h2>Enjoyed reading?</h2>
          <p>
            Share this article with your friends and family. Let's spread the
            knowledge.
          </p>
        </div>
        {/* share button */}
        <div>
          <Button color="primary" className="">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
