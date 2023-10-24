import Elysia from "elysia";
import { github } from "./github";

export const authModule = new Elysia({
    prefix: "/auth",
}).use(github)