import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const accessTokenParmas = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenUrl = `https://github.com/login/oauth/access_token?${accessTokenParmas}`;

  const { error, access_token } = await (
    await fetch(accessTokenUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const userProfileData = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  ).json();

  const { user, id } = userProfileData;

  return Response.json({ userProfileData });
}
