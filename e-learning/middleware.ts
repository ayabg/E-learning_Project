import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     * 5. / root route
     */
    "/",
    "/((?!api/|_next/|_static/|temp-images|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const newHeaders = new Headers(req.headers);
  newHeaders.set("x-current-path", req.url);

  if (req.headers.get('next-action')) {
    return NextResponse.next()
  }

  const searchParams = url.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  /*
  if (path.startsWith("/dashboard")) {
    const token = await getToken({ req: req });

    if (!token) {
      const loginUrl = new URL("/NotAllowed", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (path.startsWith("/panel")) {
    const token = await getToken({ req });

    if (!token) {
      const loginUrl = new URL("/NotAllowed", req.url);
      return NextResponse.redirect(loginUrl);
    }

    if (token?.role !== "admin") {
      const notAllowedUrl = new URL("/NotAllowed", req.url);
      return NextResponse.redirect(notAllowedUrl);
    }
  }
  */

  return NextResponse.rewrite(new URL(`${path}`, req.url), {
    headers: newHeaders,
  });
}
