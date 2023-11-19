import { html } from "@elysiajs/html";
import Elysia from "elysia";

export function SideNav({ children }: PropsWithChildren) {
  return (
    <div>
      <header class="bg-blue-500 p-4 ">
        <div class="container mx-auto flex items-center justify-between">
          <h1 class="text-2xl text-white font-bold">My Blog</h1>
          <button
            _="
            on click toggle .hidden on #sidebar settle
            then add .opacity-50 to #sidenavClose 
            then remove .opacity-0 from #sidenavClose 
            then add .w-64 to #nav 
            then remove .w-0 from #nav      
            "
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
              <a href="/blog/list">About</a>
            </li>
            <li>
              <a href="/blog/text">Blog</a>
            </li>
            <li>
              <a href="/blog/create">Contact</a>
            </li>
          </ul>
        </div>
        <div
        style="transition-duration: 0s;"
          class="fixed left-0 top-0 h-full w-full z-20 
                text-white 
                hidden md:hidden 
                flex
                transition-all duration-100 ease-out
                "
          id="sidebar"
        >
          <nav
            id="nav"
            class="
            h-full w-0 bg-gray-800 
            transition-all duration-500 ease-out 
            overflow-hidden
            "
          >
            <div class="p-4">
              <a href="#" class="block py-2">
                Home
              </a>
              <a href="#" class="block py-2">
                About
              </a>
              <a href="#" class="block py-2">
                Services
              </a>
              <a href="#" class="block py-2">
                Contact
              </a>
            </div>
          </nav>
          <div
          style="transition-duration: 0s;"
            class="
            h-full 
            flex-1 
            bg-black 
            opacity-50
            "
            id="sidenavClose"
            _="
            on click remove .w-64 from #nav 
            then add .w-0 to #nav settle 
            then add .opacity-0 to me
            then remove .opacity-50 from me 
            then toggle .hidden on #sidebar
            "
          ></div>
        </div>
      </header>
      <div id="content" class="h-full w-full">
        {children}
      </div>
    </div>
  );
}
