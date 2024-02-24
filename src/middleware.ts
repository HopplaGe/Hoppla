import {NextRequest, NextResponse} from "next/server";
import {auth} from "./lib/auth";
import createIntlMiddleware from "next-intl/middleware";
import {locales, defaultLocale, localePrefix} from "./i18n/locales";
import {getRouteType, redirect} from "./lib/middlewareFunctions";

const intlMiddleware = createIntlMiddleware({
    locales,
    localePrefix,
    defaultLocale,
});

export const publicRoutes = [
    "/",
    "/login",
    "/carpool",
    "/minibuses",
    "/buses",
    "/offer-seats",
    "/search",
    "/blog",
    "/blog/[id]",
];
export const adminRoutes = ["/manage"];

export default function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.includes(".")) {
        return NextResponse.next();
    }
    const routeType = getRouteType(request);
    if (routeType === "public") {
        return intlMiddleware(request);
    }
    return auth((req) => {
        const isLoggedIn = !!req.auth;
        const userRole = req.auth?.user.role;
        if (!isLoggedIn) {
            return redirect(request, "/login");
        }
        if (routeType === "admin" && userRole !== "ADMIN") {
            return redirect(request, "/");
        }
        return intlMiddleware(request);
    })(request, {});
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    // matcher: "/((?!api|static|.\..|_next).*)",
};
