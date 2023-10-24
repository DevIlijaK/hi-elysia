import Elysia from "elysia";
import { auth, githubAuth } from "../../config/auth";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { parseCookie, serializeCookie } from "lucia/utils";

export const github = new Elysia({
  prefix: "/github",
})
  .get("", async () => {
    const [url, state] = await githubAuth.getAuthorizationUrl();

    const stateCookie = serializeCookie("github_oauth_state", state, {
      httpOnly: true,
      secure: false, // `true` for production
      path: "/",
      maxAge: 60 * 60,
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: url.toString(),
        "Set-Cookie": stateCookie,
      },
    });
  })
  .get("/callback", async ({ request }) => {
    const cookies = parseCookie(request.headers.get("Cookie") ?? "");
    const storedState = cookies.github_oauth_state;
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    if (!storedState || !state || storedState !== state || !code) {
      return new Response(null, {
        status: 400,
      });
    }

    try {
      const { getExistingUser, githubUser, createUser } =
        await githubAuth.validateCallback(code);

      const getUser = async () => {
        const existingUser = await getExistingUser();
        if (existingUser) return existingUser;
        const user = await createUser({
          attributes: {
            username: githubUser.login,
          },
        });
        return user;
      };

      const user = await getUser();
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      const sessionCookie = auth.createSessionCookie(session);
      // redirect to profile page
      return new Response(null, {
        headers: {
          Location: "/",
          "Set-Cookie": sessionCookie.serialize(), // store session cookie
        },
        status: 302,
      });
    } catch (e) {
      if (e instanceof OAuthRequestError) {
        // invalid code
        return new Response(null, {
          status: 400,
        });
      }
      return new Response(null, {
        status: 500,
      });
    }
  });
