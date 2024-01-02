import Elysia from "elysia";
import { blogController } from "./blog/blogControler";
import { sidenav } from "./blog/sidenav";

export const controllers = new Elysia().use(blogController).use(sidenav);
