import Elysia from "elysia";
import { BaseHtml } from "./baseHTML";
import { html } from "@elysiajs/html";

export const login = new Elysia({
  prefix: "/login",
})
  .use(html())
  .get("", () => (
    <BaseHtml>
      <div class="bg-gray-100 min-h-screen flex items-center justify-center">
        <div class="container mx-auto max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-center">Login</h2>
          <form
            action="#"
            method="post"
            hx-post="/auth/basic/login"
            hx-swap="innerHTML"
          >
            <div class="mt-4">
              <label for="username" class="block">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                //   required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div class="mt-4">
              <label for="password" class="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                //   required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div class="mt-6">
              <button
                type="submit"
                class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
            </div>
            <div class="min-h-auto min-w-auto border">
              <iframe
                src="https://giphy.com/embed/3o7bu3XilJ5BOiSGic"
                //   frameBorder="0"
                class="giphy-embed htmx-indicator"
                //   allowFullScreen
              ></iframe>
            </div>
          </form>

          <div class="mt-6">
            <button
              class="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
              hx-post="/auth/basic/logout"
            >
              Logout
            </button>
          </div>
          <a
            hx-boost="false"
            href="/auth/github/login"
            class="display-block rounded-lg bg-gray-800 p-2 text-center text-white transition duration-200 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Sign In with Github
            <div class="i-logos-google-icon inline-block text-2xl" />
          </a>
        </div>
      </div>
    </BaseHtml>
  ));
