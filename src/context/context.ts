import Elysia from "elysia";
import { db } from "../db";
import { auth } from "../config/auth";

export const ctx = new Elysia()
  .decorate("db", db)
  .decorate("auth", auth)
  .derive(async (ctx) => {
    const authRequest = ctx.auth.handleRequest(ctx);
    const session = await authRequest.validate();

    return { session };
  });
