import { NextRequest } from "next/server";
import getSession from "./app/lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      Response.redirect(new URL("/", request.url));
    }
  } else {
    if (!exists) {
      Response.redirect(new URL("/profile", request.url));
    }
  }
}

export const config = {
  matcher: ["/profile", "/login"],
};
