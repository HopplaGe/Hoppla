import createIntlMiddleware from "next-intl/middleware";
import {NextRequest} from "next/server";
import {locales, defaultLocale, localePrefix} from "./i18n/locales";
import NextAuth from "next-auth";
import authConfig from "@/config/auth.config";

const {auth} = NextAuth(authConfig);

const publicRoutes = ["/", "/login", "/minibuses", "/buses", "/carpool"];
const privateRoutes = ["/dashboard", "/settings", "/manage"];
const apiAuthRoute = "/api/auth";
// const defaultLoginRedirect = "/dashboard";

const intlMiddleware = createIntlMiddleware({
    locales,
    localePrefix,
    defaultLocale,
});

export const authMiddleware = auth((req: NextRequest) => {
    const {nextUrl} = req;
    //@ts-ignore
    const isLoggedIn = !!req.auth;
    const currentLocale = intlMiddleware(new NextRequest(req)).cookies.get("NEXT_LOCALE")?.value;

    const publicPagesWithLocale = publicRoutes.map((p) => '/' + currentLocale + p);
    const privatePagesWithLocale = privateRoutes.map((p) => '/' + currentLocale + p);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoute);
    const isPublicRoute = publicPagesWithLocale.includes(nextUrl.pathname);
    const isPrivateRoute = privatePagesWithLocale.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return true;
    }
    //
    // if (isPublicRoute) {
    //     return intlMiddleware(new NextRequest(req));
    // }

    if (isPrivateRoute && !isLoggedIn) {
        return Response.redirect(new URL(`/${currentLocale}/?redirect=${nextUrl.pathname}`, req.nextUrl.origin).toString(), 302);
    }

    // if (isLoggedIn) {
    //     return intlMiddleware(new NextRequest(req));
    // }
})

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join("|")}))?(${publicRoutes
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
        "i"
    );

    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    // for future use
    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return authMiddleware(req, {});
    }
}

// export const {auth: middleware} = NextAuth(authConfig)

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
