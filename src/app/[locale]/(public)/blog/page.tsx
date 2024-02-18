import { Image } from "@nextui-org/react";
import BlogCard from "./_components/BlogCard";

type BlogPageProps = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function BlogPage({ params, searchParams }: BlogPageProps) {
    return <div className="page-wrapper fira-go py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
            <div className="lg:order-last">
                <img className="w-full max-w-full rounded-xl" src="https://t3.ftcdn.net/jpg/02/45/68/40/360_F_245684006_e55tOria5okQtKmiLLbY30NgEHTIB0Og.jpg" alt="" />
            </div>            <div className="col-span-2 py-10">
                <h3 className="text-5xl mb-6">Spark, Evolve, Conquer:
                    path to Personal Excellence
                </h3>
                <p>
                    In this engaging blog, embark on a journey of self-discovery and personal growth. Learn how to
                    overcome your fears, and become the best version of yourself. Our blog will help you to
                    understand the importance of personal development and how it can help you to achieve your
                </p>
                <div>
                    <span className="text-gray-500 text-xs">Published on 12th October 2021</span>

                </div>
            </div>
        </div>
        <div className="mt-10 lg:mt-32 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <BlogCard img="https://xetera.dev/_astro/banner.d8f34026_Zd5u55.webp" />
            <BlogCard img="https://xetera.dev/_astro/banner.aa1fcf7e_Z1xDXT9.webp" />
            <BlogCard img="https://xetera.dev/_astro/banner.7ca0ed73_1jMqbi.webp" />
            {/* <BlogCard /> */}
        </div>
    </div>;
}
