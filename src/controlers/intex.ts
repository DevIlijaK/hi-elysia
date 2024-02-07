import Elysia from "elysia";
import { blogController } from "./blog/blogControler";
import { sidenav } from "./blog/sidenav";
import {imagesController} from "./images/imagesController";

export const controllers = new Elysia().use(blogController).use(sidenav).use(imagesController);
