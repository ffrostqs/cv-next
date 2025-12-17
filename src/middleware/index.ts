import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { applyThemeMiddleware } from "./theme";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 🔹 Theme
  applyThemeMiddleware(request, response);

  // 🔹 Locale (майбутнє)
  // applyLocaleMiddleware(request, response);

  // 🔹 Feature flags (майбутнє)
  // applyFeatureFlagsMiddleware(request, response);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};
