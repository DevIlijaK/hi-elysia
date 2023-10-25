import Elysia from "elysia";
import { github } from "./github";
import { basic } from "./basic";

export const authModule = new Elysia({
  prefix: "/auth",
})
  .use(github)
  .use(basic);
