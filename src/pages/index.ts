import Elysia from "elysia";
import { login } from "./login";

export const pages = new Elysia().use(login);
