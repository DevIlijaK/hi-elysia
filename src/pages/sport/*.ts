import Elysia from "elysia";
import { tenis } from "./tenis";
import { court } from "./tenisCourt";

export const sports = new Elysia({
    prefix: "/sport"
}).use(tenis).use(court)