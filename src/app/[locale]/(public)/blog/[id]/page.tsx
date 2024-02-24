import {getArticle} from "@/lib/actions/articles";
import MarkdownPreview from "./_components/MarkdownPreview";
import moment from "moment";
import "moment/locale/ka";
import {Button} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Tags from "./_components/Tags";
import {ChevronLeft} from "lucide-react";

type pageProps = {
    params: {
        locale: string;
        id: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({params}: pageProps) {
    const blog = await getArticle(params.id);
    if (!blog) {
        return (
            <div className="page-wrapper my-10 text-center text-3xl">
                <h1>Blog not found</h1>
            </div>
        );
    }

    return (
        <div className="page-wrapper fira-go w-full">
            {/* go back */}
            <div className="flex flex-row justify-start items-center gap-2 py-5">

                <Button variant="light" color="default" className="p-2 min-w-unit-0" as={Link} href={"/blog"}
                        startContent={<ChevronLeft size={44}/>}/>
                <h1
                    className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-10"
                    data-astro-transition-scope="astro-X4J6SPKD-2"
                >
                    {blog.title}
                </h1>
            </div>

            <Image
                src={blog.picture!}
                alt="Blog picture"
                width={1000}
                height={500}
                // sizes=""
                className="rounded-xl h-[500px] object-cover w-full max-w-full"
            />
            {/* tags */}
            <div className="flex flex-col md:flex-row-reverse justify-between gap-2 my-4">
                <Tags tags={blog.tags}/>
                <div>
                    <span className="text-gray-500 text-sm py-2">
                        {moment(blog.createdAt).format("LL")}
                    </span>
                </div>
            </div>
            <MarkdownPreview source={blog.content}/>

            <div
                className="flex flex-col lg:flex-row gap-5 justify-between items-start lg:items-center bg-white p-5 rounded-xl my-5 lg:my-10 fira-go">
                <div>
                    <h2 className="text-sm md:text-medium lg:text-xl">Enjoyed reading?</h2>
                    <p className="text-xs md:text-sm">
                        Share this article with your friends and family. Let
                        spread the knowledge.
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
