import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import moment from "moment";
import "moment/locale/ka";
import Link from "next/link";
import Image from "next/image";

type BlogCardProps = {
  blog: Prisma.ArticleGetPayload<{
    include: { tags: true };
  }>;
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.id}`}>
      <div className="bg-transparent rounded-xl">
        <Image
          className="w-full max-w-full object-cover rounded-xl h-[300px] hover:scale-105 transition-transform duration-300"
          src={blog.picture!}
          alt={blog.title}
          width={300}
          height={300}
        />
        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map(({ name }, index) => (
              <span key={index} className="text-xs bg-gray-200 p-2 rounded-md">
                #{name}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold mt-2 mb-4">{blog.title}</h3>
          {/* one liner */}
          <p className="mb-4">{blog.heading}</p>
          {/* date */}
          <div>
            <span className="text-gray-500 text-xs">
              {moment(blog.createdAt).format("Do MMMM YYYY")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
