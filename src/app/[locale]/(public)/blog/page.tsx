import { Button, Image } from "@nextui-org/react";
import BlogCard from "./_components/BlogCard";
import { getArticles } from "@/lib/actions/articles";
import { ArticleLanguage } from "@prisma/client";
import moment from "moment";
// georgian ka moment
import "moment/locale/ka";
import Link from "next/link";
type BlogPageProps = {
    params: {
        locale: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

// const revalidate = 0;

export default async function BlogPage({
    params,
    searchParams,
}: BlogPageProps) {
    const locale = params.locale.toUpperCase() as ArticleLanguage;
    const blogs = await getArticles([], locale);
    const latestBlog = blogs[0];

    if (!blogs || blogs.length === 0) {
        return (
            <div className="page-wrapper fira-go my-10 text-3xl text-center font-bold">
                No blogs found
            </div>
        );
    }

    return (
        <div className="page-wrapper fira-go py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
                <div className="lg:order-last">
                    <Image
                        className="w-full max-w-full rounded-xl hover:scale-105 transition-transform duration-300"
                        src={latestBlog.picture!}
                        alt=""
                    />
                </div>{" "}
                <div className="col-span-2 py-10">
                    <h3 className="text-5xl mb-6">{latestBlog.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-5">
                        {latestBlog.tags.map(({ name }, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-200 p-2 rounded-md"
                            >
                                #{name}
                            </span>
                        ))}
                    </div>
                    <p>{latestBlog.heading}</p>

                    <div>
                        <span className="text-gray-500 text-xs">
                            {moment(latestBlog.createdAt).format(
                                "Do MMMM YYYY"
                            )}
                        </span>
                    </div>
                    {/* button to redirect */}
                    <Button className="mt-5" color="primary">
                        <Link href={`/${params.locale}/blog/${latestBlog.id}`}>
                            Read More
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="mt-10 lg:mt-32 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {blogs.slice(1).map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
                {/* <BlogCard /> */}
            </div>
        </div>
    );
}
