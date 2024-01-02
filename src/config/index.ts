import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
  server: {
    // lOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
    // dATABASE_CONNECTION_TYPE: z.enum(["local", "remote", "local-replica"]),
    DATABASE_URL: z.string().min(1),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    // .refine((s) => {
    // not needed for local only
    // const type = process.env.DATABASE_CONNECTION_TYPE;
    // return type === "remote" || type === "local-replica"
    // ? s && s.length > 0
    // : true;
    // }),
    NODE_ENV: z.enum(["development", "production"]),
    // GOOGLE_CLIENT_ID: z.string(),
    // GOOGLE_CLIENT_SECRET: z.string(),
    // HOST_URL: z.string(),
    // TURSO_API_KEY: z.string(),
  },
  runtimeEnv: process.env,
});

const args = {
  // watch: process.argv.includes("--watch"),
  // liveReload: true,
};

export const config = {
  env,
  args,
};
