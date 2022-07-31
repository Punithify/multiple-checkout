import { NextResponse } from "next/server";
export const config = {
  matcher: "/",
};

export default async function middleware(req) {
  const { nextUrl: url, geo } = req;
  console.log(req);
  const country = geo.country | "IN";
  console.log("geocountry", geo.country);

  url.searchParams.set("country", country);

  return NextResponse.rewrite(url);
}
