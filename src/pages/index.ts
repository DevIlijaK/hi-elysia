import Elysia from "elysia";
import { auth } from "../config/auth";
import { redirect } from "../lib";
import { blogPages } from "./components/blog";

export const pages = new Elysia()
  // .onBeforeHandle(async (context) => {
  //   const authRequest = auth.handleRequest(context);
  //   const session = await authRequest.validate();
  //   if (!session) {
  //     redirect(
  //       {
  //         set: context.set,
  //         headers: context.headers,
  //       },
  //       "/login"
  //     );
  //     context.set.status = 302;
  //     return "No session found";
  //   }
  // })
  // .use(sports)
  .use(blogPages);
