import createIntlMiddleware from "next-intl/middleware";
import {NextRequest} from "next/server";
import {locales, defaultLocale, localePrefix} from "./i18n/locales";
import NextAuth from "next-auth";
import authConfig from "@/config/auth.config";

const {auth} = NextAuth(authConfig);

const publicRoutes = ["/", "/login", "/carpool", "/minibuses", "/buses"];
const privateRoutes = ["/dashboard"];
const apiAuthRoute = "/api/auth";
// const defaultLoginRedirect = "/dashboard";

const intlMiddleware = createIntlMiddleware({
    locales,
    localePrefix,
    defaultLocale,
});

const authMiddleware = auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    const currentLocale = intlMiddleware(new NextRequest(req)).cookies.get("NEXT_LOCALE")?.value;

    // const publicPagesWithLocale = publicRoutes.map((p) => '/' + currentLocale + p);
    const privatePagesWithLocale = privateRoutes.map((p) => '/' + currentLocale + p);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoute);
    // const isPublicRoute = publicPagesWithLocale.includes(nextUrl.pathname);
    const isPrivateRoute = privatePagesWithLocale.includes(nextUrl.pathname);

    // console.log("pathname", nextUrl.pathname);
    // console.log("currentLocale", currentLocale);
    // console.log("privatePagesWithLocale", privatePagesWithLocale);
    // console.log("isLoggedIn", isLoggedIn);
    // console.log("isPublicRoute", isPublicRoute);
    // console.log("isPrivateRoute", isPrivateRoute);

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

    if (isLoggedIn) {
        return intlMiddleware(new NextRequest(req));
    }
})

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join("|")}))?(${publicRoutes
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
        "i"
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    // return intlMiddleware(req);
    // for future use
    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
