import {Button, Image} from "@nextui-org/react";
import BlogCard from "./_components/BlogCard";
import {getArticles} from "@/lib/actions/articles";
import {ArticleLanguage} from "@prisma/client";
import moment from "moment";
// georgian ka moment
import "moment/locale/ka";
import Link from "next/link";
import {ChevronRight} from "lucide-react";

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
        <div className="page-wrapper fira-go py-5 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
                <div className="lg:order-last">
                    <Image
                        className="w-full max-w-full rounded-xl hover:scale-105 transition-transform duration-300"
                        src={latestBlog.picture!}
                        alt={latestBlog.title}
                    />
                </div>
                {" "}
                <div className="col-span-2 py-5 lg:py-10 flex flex-col gap-2">
                    <h3 className="text-2xl">{latestBlog.title}</h3>
                    <div className="flex flex-wrap gap-2">
                        {latestBlog.tags.map(({name}, index) => (
                            <span
                                key={index}
                                className="text-xs bg-gray-200 px-2 py-1 rounded-md"
                            >
                                #{name}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm">{latestBlog.heading}</p>

                    <div>
                        <span className="text-gray-500 text-xs">
                            {moment(latestBlog.createdAt).format(
                                "LL"
                            )}
                        </span>
                    </div>
                    <div>
                        <Button color="primary" variant="light" size="md" as={Link}
                                href={`/${params.locale}/blog/${latestBlog.id}`} endContent={<ChevronRight/>}>
                            წაიკითხე სრულად
                        </Button>
                    </div>

                </div>
            </div>
            <div className="mt-10 lg:mt-32 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {blogs.slice(1).map((blog) => (
                    <BlogCard key={blog.id} blog={blog}/>
                ))}
                {/* <BlogCard /> */}
            </div>
        </div>
    );
}
