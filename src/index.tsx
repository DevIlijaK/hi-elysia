import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { authModule } from "./controlers/auth";
import { controllers } from "./controlers/intex";
import { pages } from "./pages";
import { BaseHtml } from "./pages/baseHTML";
import { SideNav } from "./pages/components/sidenav";
import { login } from "./pages/login";
import staticPlugin from "@elysiajs/static";

const app = new Elysia()

  .onAfterHandle(({ response, set, headers, cookie }) => {
    if (set.status != 302) {
      const children: Children = response as Children;
      if (headers["hx-request"] == "true") {
        return children;
      } else {
        set.headers["Content-Type"] = "text/html; charset=utf8";
        return (
          <BaseHtml>
            <SideNav>{children}</SideNav>
          </BaseHtml>
        );
      }
    }
  })
  .use(html())
  .use(staticPlugin())
  .use(login)
  .use(authModule)
  .use(controllers)
  .use(pages)
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
