import {NextRequest} from "next/server";
import {auth} from "./lib/auth";
import createIntlMiddleware from "next-intl/middleware";
import {locales, defaultLocale, localePrefix} from "./i18n/locales";
import {getRouteType, redirect} from "./lib/middlewareFunctions";

const intlMiddleware = createIntlMiddleware({
    locales,
    localePrefix,
    defaultLocale,
});

export const publicRoutes = ["/", "/login", "/carpool", "/minibuses", "/buses"];
export const adminRoutes = ["/admin"];

export default function middleware(request: NextRequest) {
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