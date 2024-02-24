import {locales} from "@/i18n/locales";
import {publicRoutes, adminRoutes} from "@/middleware";
import {NextRequest, NextResponse} from "next/server";

type RouteType = "public" | "private" | "admin";

// function checkRouteType(req: NextRequest, routes: string[]) {
//     const pathnameRegex = RegExp(
//         `^(/(${locales.join("|")}))?(${routes
//             .flatMap((p) => (p === "/" ? ["", "/"] : p))
//             .join("|")})/?$`,
//         "i"
//     );
//     return pathnameRegex.test(req.nextUrl.pathname);
// }

function checkRouteType(req: NextRequest, routes: string[]) {
    const splitPathname = req.nextUrl.pathname.split("/").slice(1);
    if (
        (splitPathname.length > 0 && locales.includes(splitPathname[0])) ||
        splitPathname[0] === ""
    ) {
        splitPathname.shift();
    }
    return routes.some((route) => {
        if (route === "/") return splitPathname.length === 0;
        return ("/" + splitPathname.join("/")).startsWith(route);
    });
}

export function getRouteType(req: NextRequest): RouteType {
    if (checkRouteType(req, publicRoutes)) return "public";
    if (checkRouteType(req, adminRoutes)) return "admin";
    return "private";
}

export function redirect(req: NextRequest, redirectURL: string) {
    return NextResponse.redirect(
        new URL(redirectURL, req.nextUrl.origin).toString()
    );
}