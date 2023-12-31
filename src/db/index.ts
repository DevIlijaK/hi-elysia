import { createClient, type Config } from "@libsql/client";
import { config } from "../config";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from './schema/index'

const options = {
        url: config.env.DATABASE_URL,
        authToken: config.env.DATABASE_AUTH_TOKEN,
} satisfies Config;

export const client = createClient(options)


export const db = drizzle(client, {schema, logger: true})