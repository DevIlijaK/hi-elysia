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
      const backgroundGif = Bun.file("public/images/pozadina.gif");

      const backgroundGifUrl = `
      background-image: url('data:image/gif;base64,${Buffer.from(
        await backgroundGif.arrayBuffer()
      ).toString("base64")}');
      background-repeat:no-repeat;
      background-size: cover;
      background-position:center;
      `;

      const backgroundStatic = Bun.file("public/images/pozadinaStatic.jpg");

      const backgroundStaticUrl = `
      background-image: url('data:image/gif;base64,${Buffer.from(
        await backgroundStatic.arrayBuffer()
      ).toString("base64")}');
      display:none;
      `;

      const heroImage = Bun.file("public/images/mrPlanet.png");
      const heroImageUrl = `
      data:image/png;base64,${Buffer.from(
        await heroImage.arrayBuffer()
      ).toString("base64")}
      `;
      if (set.status != 302) {
        const children: Children = response as Children;
        if (headers["hx-request"] == "true") {
          return children;
        } else {
          set.headers["Content-Type"] = "text/html; charset=utf8";
          return (
            <BaseHtml>
              <SideNav>
                {{
                  children,
                  backgroundGifUrl,
                  heroImageUrl,
                  backgroundStaticUrl,
                }}
              </SideNav>
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
