import Elysia, { t } from "elysia";
import { auth } from "../../config/auth";
import { LuciaError } from "lucia";
import { redirect } from "../../lib";

export const basic = new Elysia({
  prefix: "/basic",
})
  .post(
    "/signup",
    async ({ body: { username, password } }) => {
      try {
        const user = await auth.createUser({
          key: {
            providerId: "username", // auth method
            providerUserId: username.toLowerCase(), // unique id when using "username" auth method
            password, // hashed by Lucia
          },
          attributes: {
            username,
          },
        });
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
        // this part depends on the database you're using
        // check for unique constraint error in user table
        if (e instanceof Error && e.message === "Greska") {
          return new Response("Username already taken", {
            status: 400,
          });
        }

        return new Response("An unknown error occurred", {
          status: 500,
        });
      }
    },
    {
      body: t.Object({
        username: t.String({
          minLength: 1,
          maxLength: 20,
        }),
        password: t.String({
          minLength: 4,
          maxLength: 255,
        }),
      }),
    }
  )
  .post("/logout", async (context) => {
    const authRequest = auth.handleRequest(context);
    const session = await authRequest.validate();
    if (!session) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    await auth.invalidateSession(session.sessionId);
    const sessionCookie = auth.createSessionCookie(null);
    context.set.headers["Set-Cookie"] = sessionCookie.serialize();
    redirect(
      {
        set: context.set,
        headers: context.headers,
      },
      "/login"
    );
  })
  .post(
    "/login",
    async ({ body: { username, password }, set, headers }) => {
      try {
        const key = await auth.useKey(
          "username",
          username.toLowerCase(),
          password
        );

        const session = await auth.createSession({
          userId: key.userId,
          attributes: {},
        });
        const sessionCookie = auth.createSessionCookie(session);
        set.headers["Set-Cookie"] = sessionCookie.serialize();
        redirect(
          {
            set: set,
            headers: headers,
          },
          "/sport/tenis"
        );
      } catch (e) {
        if (
          e instanceof LuciaError &&
          (e.message === "AUTH_INVALID_KEY_ID" ||
            e.message === "AUTH_INVALID_PASSWORD")
        ) {
          return new Response("Incorrect username or password", {
            status: 400,
          });
        }
        return new Response("An unknown error occurred", {
          status: 500,
        });
      }
    },
    {
      body: t.Object({
        username: t.String({
          minLength: 1,
          maxLength: 20,
        }),
        password: t.String({
          minLength: 4,
          maxLength: 255,
        }),
      }),
    }
  );
