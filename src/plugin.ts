import Elysia from "elysia";

export const nesto = new Elysia()
  .state("plugin-version", 1)
  .get("/from-plugin", () => "HI");
