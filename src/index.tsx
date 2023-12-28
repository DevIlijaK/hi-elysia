import { Elysia } from "elysia";
import { authModule } from "./controlers/auth";
import { controllers } from "./controlers/intex";
import { pages } from "./pages";
import { login } from "./pages/login";
import { BaseHtml } from "./pages/baseHTML";
import { SideNav } from "./pages/components/sidenav";
import { html } from "@elysiajs/html";

const app = new Elysia()

  .onAfterHandle(({ response, set, headers }) => {
    console.log("Response", response);
    console.log("Set: ", set);
    console.log("Headers: ", headers);

    set.headers["Content-Type"] = "text/html; charset=utf8";
    const children: Children = response as Children;
    if (headers["hx-request"] == "true") {
      console.log("Uslo ovde!");
      return children;
    } else {
      return (
        <BaseHtml>
          <SideNav>{children}</SideNav>
        </BaseHtml>
      );
    }
  })
  .use(html())
  .use(login)
  .use(authModule)
  .use(controllers)
  .use(pages)
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
