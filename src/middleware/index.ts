import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { applyThemeMiddleware } from "./theme";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 🔹 Theme
  applyThemeMiddleware(request, response);

  // 🔹 Locale (майбутнє)
  // applyLocaleMiddleware(request, response);

  // 🔹 Feature flags (майбутнє)
  // applyFeatureFlagsMiddleware(request, response);

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login" || pathname === "/admin/signin") {
      return response;
    }

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const role = token?.role as string | undefined;
    if (!role || (role !== "admin" && role !== "editor")) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("callbackUrl", pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      applyThemeMiddleware(request, redirectResponse);
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
