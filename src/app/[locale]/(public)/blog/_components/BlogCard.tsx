import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

type BlogCardProps = {
    img: string;
};

export default function BlogCard({
    img
}: BlogCardProps) {
    return (
        <div className="bg-transparent rounded-xl">
            <img
            className="w-full max-w-full object-cover rounded-xl h-[300px] hover:scale-105 transition-transform duration-300" 
            src={img}
            />
            <div className="p-5">
                <div className="flex flex-wrap gap-2">
                {
                 ["#personaldevelopment", "#selfdiscovery", "#personalgrowth", "#overcomefears", "#bestversionofyourself"].map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-200 p-2 rounded-md">{tag}</span>
                ))
                }
                </div>
                <h3 className="text-xl font-bold mt-2 mb-4">Spark, Evolve, Conquer: path to Personal Excellence</h3>
                {/* one liner */}
                <p className="mb-4">In this engaging blog, embark on a journey of self-discovery and personal growth. Learn how to overcome your fears, and become the best version of yourself. Our blog will help you to understand the importance of personal development and how it can help you to achieve your</p>
                {/* date */}
                <div>
                    <span className="text-gray-500 text-xs">Published on 12th October 2021</span>
                </div>
            </div>
        </div>
      );
}
