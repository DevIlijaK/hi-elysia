import Elysia from "elysia";
import { blogController } from "./blog/blogControler";

export const controllers = new Elysia().use(blogController);
