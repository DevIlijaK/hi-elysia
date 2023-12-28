import { Elysia } from "elysia";
import { authModule } from "./controlers/auth";
import { controllers } from "./controlers/intex";
import { pages } from "./pages";
import { login } from "./pages/login";
import { nesto } from "./plugin";
import { BaseHtml } from "./pages/baseHTML";
import { SideNav } from "./pages/components/sidenav";

const app = new Elysia()
  .onAfterHandle(({ response ,set}) => {
    console.log("Response", response);
    set.headers['Content-Type'] = 'text/html; charset=utf8'
    const children: Children = response as Children;
    return (
      <BaseHtml>
        <SideNav>{children}</SideNav>
      </BaseHtml>
    );
  })
  .use(nesto)
  .use(login)
  .use(authModule)
  .use(controllers)
  .use(pages)
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
