import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { DEFAULT_LOCALE, isLocale } from "@/config/languages";

const RESERVED_SLUGS = new Set([
  "privacy",
  "terms",
  "blog",
  "p",
  "admin",
  "api",
  "images",
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/login") || pathname.startsWith("/admin/signin")) {
      return NextResponse.next();
    }

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const role = token?.role;
    if (role !== "admin" && role !== "editor") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1) {
    const slug = segments[0];
    if (!isLocale(slug) && !RESERVED_SLUGS.has(slug)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${DEFAULT_LOCALE}/p/${slug}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
