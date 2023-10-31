import { html } from "@elysiajs/html";
import Elysia from "elysia";

export function SideNav({ children }: PropsWithChildren) {
  return (
    <div>
      <header class="bg-blue-500 py-4">
        <div class="container mx-auto flex items-center justify-between">
          <h1 class="text-2xl text-white font-bold">My Blog</h1>
          <button
            _="on click toggle .hidden on #menu-list"
            id="menu-button"
            class="block md:hidden text-white p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="24"
              height="24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <ul id="menu-list" class="hidden md:flex space-x-4">
            <li>
              <a href="/sport/court">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </header>
      <div class="h-full w-full">{children}</div>
    </div>
  );
}
