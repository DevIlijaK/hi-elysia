import { Elysia } from "elysia";
import { authModule } from "./controlers/auth";
import { controllers } from "./controlers/intex";
import { pages } from "./pages";
import { login } from "./pages/login";
import { nesto } from "./plugin";

const app = new Elysia()
  .use(nesto)
  .use(login)
  .use(authModule)
  .use(controllers)
  .use(pages)
  .onAfterHandle((context) => {
    console.log('123', context);
  })
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
