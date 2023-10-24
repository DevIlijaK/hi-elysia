import { elysia } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { lucia } from "lucia";
import { client } from "../../db";
import { config } from "..";
import { github } from "@lucia-auth/oauth/providers";


export const auth = lucia({
    env: 'DEV',
    middleware: elysia(),
    adapter: libsql(client, {
		user: "user",
		key: "user_key",
		session: "user_session"
	}),
    sessionCookie: {
		expires: false
	},
    getUserAttributes: (data) => {
		return {
			githubUsername: data.username
		};
	}
})

export const githubAuth = github(auth,{
  clientId: config.env.GITHUB_CLIENT_ID,
  clientSecret: config.env.GITHUB_CLIENT_SECRET
});
export type Auth = typeof auth;
