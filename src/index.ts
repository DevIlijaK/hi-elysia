import { plugin } from "bun";
import { Elysia } from "elysia";
import { nesto } from "./plugin";
import { authModule } from "./controlers/auth";
import { login } from "./pages/login";
import { pages } from "./pages";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/test", () => "Test")
  .get("/test/:id", ({ params: { id } }) => {
    if (Number(id) === 1) {
      return "ilija";
    } else {
      return "Niko";
    }
  })
  .get(
    "test1",
    ({ set }) =>
      new Response(
        JSON.stringify({
          vtuber: ["shiraki fubuki", "Inugami Korone"],
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
  )
  .get("/test2", ({ set }) => ({
    ...set,
  }))
  .state("version", 1)
  .decorate("getDate", () => Date.now())
  .get(
    "/version",
    ({ getDate, store: { version } }) => `${version} ${getDate()}`
  )
  .state({
    a: "a",
    b: "b",
  })
  .state(({ b, ...rest }) => rest)
  .get("/version2", ({ store: { a } }) => a)
  .state("numbetVersion", 1 as number | null)
  .get("version3", ({ store: { version } }) => version)
  .derive(({ request: { headers }, store, getDate }) => {
    return {
      autorization: headers.get("Autorization"),
    };
  })
  .use(nesto)
  .use(login)
  .get("/version4", ({ store }) => store["plugin-version"])
  .use(authModule)
  .use(pages)
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
