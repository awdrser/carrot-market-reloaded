import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("hello");
}

export const config = {
  matcher: ["/profile", "/login"],
};
