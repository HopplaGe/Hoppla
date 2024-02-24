import AddOrEditArticleForm from "../_components/AddOrEditArticleForm";
import {Button, Link} from "@nextui-org/react";
import {ChevronLeft} from "lucide-react";

type pageProps = {};

export default function page({}: pageProps) {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-col gap-4">
            <div className="flex flex-row gap-4 justify-start items-center">
                <Button
                    as={Link}
                    size="sm"
                    color="default"
                    variant="flat"
                    className="py-4 min-w-unit-0"
                    startContent={<ChevronLeft/>}
                    href={"/manage/articles"}
                />
                <h1 className="text-sm md:text-xl">სტატიის დამატება</h1>
            </div>
            <AddOrEditArticleForm/>
        </div>
    );
}
