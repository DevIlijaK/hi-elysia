import Elysia from "elysia";
import { tenis } from "./sport/tenis";
import { auth } from "../config/auth";
import { redirect } from "../lib";
import { sports } from "./sport/*";
import { blog } from "./components/blogList";

export const pages = new Elysia()
  .onBeforeHandle(async (context) => {
    const authRequest = auth.handleRequest(context);
    const session = await authRequest.validate();
    if (!session) {
      redirect(
        {
          set: context.set,
          headers: context.headers,
        },
        "/login"
      );
      return new Response(null, {
        // headers: {
        //   Location: "/login",
        // },
        status: 302,
      });
    }
  })
  .use(sports)
  .use(blog);
