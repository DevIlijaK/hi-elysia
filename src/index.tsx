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

  .onAfterHandle(async ({ response, set, headers, cookie }) => {
    if (!set.headers["HTML"]) {
      const file = Bun.file("public/images/proba.gif");
      console.log("Prolazi ovo");
      const arrbuf = await file.arrayBuffer();
      const buffer = Buffer.from(arrbuf);
      const base64String = buffer.toString("base64");

      const backgroundUrl = `background-image: url('data:image/gif;base64,${base64String}');
    background-repeat:no-repeat;
    background-size: cover;
    background-position:center;`;

      const heroImage = Bun.file("public/images/mrPlanet.png");
      const heroImageUrl = `data:image/png;base64,${Buffer.from(
        await heroImage.arrayBuffer()
      ).toString("base64")}`;
      if (set.status != 302) {
        const children: Children = response as Children;
        if (headers["hx-request"] == "true") {
          return children;
        } else {
          set.headers["Content-Type"] = "text/html; charset=utf8";
          return (
            <BaseHtml>
              <SideNav>{{ children, backgroundUrl, heroImageUrl }}</SideNav>
            </BaseHtml>
          );
        }
      }
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
