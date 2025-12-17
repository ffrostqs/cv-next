import type { NextRequest, NextResponse } from "next/server";

export type Theme = "light" | "dark";

const THEME_COOKIE = "theme";
const THEME_HEADER = "x-theme";

function getThemeFromCookies(request: NextRequest): Theme | null {
  const value = request.cookies.get(THEME_COOKIE)?.value;

  if (value === "light" || value === "dark") {
    return value;
  }

  return null;
}

export function applyThemeMiddleware(
  request: NextRequest,
  response: NextResponse
) {
  const theme = getThemeFromCookies(request);

  if (theme) {
    response.headers.set(THEME_HEADER, theme);
  }
}
