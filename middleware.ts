import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// run only on homepage
export const config = {
  matcher: "/",
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  console.log(req);
  const country = geo?.country || "US";

  url.searchParams.set("country", country);

  return NextResponse.rewrite(url);
}
