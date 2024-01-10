import Elysia from "elysia";
import { auth, githubAuth } from "../../config/auth";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { parseCookie, serializeCookie } from "lucia/utils";

export const github = new Elysia({
  prefix: "/github",
})
  .get("/login", async ({ set }) => {
    const [url, state] = await githubAuth.getAuthorizationUrl();

    const stateCookie = serializeCookie("github_oauth_state", state, {
      httpOnly: true,
      secure: false, // `true` for production
      path: "/",
      maxAge: 60 * 60,
    });


    set.headers = {
      Location: url.toString(),
      "Set-Cookie": stateCookie,
    };
    set.status = 302;
  })
  .get("/callback", async ({ request, set }) => {
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
      set.headers = {
        Location: "/blog/list",
        "Set-Cookie": sessionCookie.serialize(), // store session cookie
      };
      set.status = 302;
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
