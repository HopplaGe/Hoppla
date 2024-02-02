import Link from "next/link";
import {cn} from "@/lib/utils";

interface NavLinkProps {
    href: string;
    name: string;
    current?: boolean;
}

const NavLink = ({href, name, current}: NavLinkProps) => {

    return (
        <Link
            href={href}
            className={cn(
                "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transform transition-all duration-300",
                current ? 'text-gray-900 border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900',
            )}
            aria-current={current ? 'page' : undefined}
        >
            {name}
        </Link>
    )
}

export default NavLink;