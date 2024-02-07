import Elysia from "elysia";
import {ctx} from "../../context/context";
import cache from "elysia-cache";

export const imagesController = new Elysia({
    prefix: "/images",
})
    .get("/runRight", ({set}) => {
        var runRight = Bun.file("public/images/runRight.gif");
        set.headers["Content-Type"] = runRight.type;
        set.headers["HTML"] = "false";
        return runRight;
    })

    .get("/runLeft", ({set}) => {
        var runLeft = Bun.file("public/images/runLeft.gif");
        set.headers["Content-Type"] = runLeft.type;
        set.headers["HTML"] = "false";
        return runLeft;
    })
    .get("/jumpRight", ({set}) => {
        var jumpRight = Bun.file("public/images/jumpRight.png");
        set.headers["Content-Type"] = jumpRight.type;
        set.headers["HTML"] = "false";
        return jumpRight;
    })

    .get("/jumpLeft", ({set}) => {
        var jumpLeft = Bun.file("public/images/jumpLeft.png");
        set.headers["Content-Type"] = jumpLeft.type;
        set.headers["HTML"] = "false";
        return jumpLeft;
    })
