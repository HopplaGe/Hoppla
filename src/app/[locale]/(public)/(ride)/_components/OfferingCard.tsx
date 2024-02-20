import {ElementType} from "react";

type OfferingCardProps = {
    title: string;
    description: string;
    icon: ElementType;
};

export default function OfferingCard({
                                         description,
                                         icon,
                                         title,
                                     }: OfferingCardProps) {
    const Icon = icon;
    return (
        <li className="flex flex-col gap-1 hover:bg-default-100 py-4 md:py-8 lg:py-16 px-4 hoppla-animation hover:rounded-xl">
            <div className="mb-1">
                <Icon className="text-black text-2xl md:text-4xl lg:text-5xl"/>
            </div>
            <h3 className="text-sm md:text-md lg:text-lg font-semibold">{title}</h3>
            <p className="text-xs md:text-sm text-gray-600">{description}</p>
        </li>
    );
}
