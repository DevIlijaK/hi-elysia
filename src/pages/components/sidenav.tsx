import { html } from "@elysiajs/html";
import Elysia from "elysia";

export function SideNav({ children }: PropsWithChildren) {
  return (
    <div>
      <header
        _="on load measure my bounds then add {
                  margin-top: ${bounds.height}px;
              } to #content"
        class="bg-blue-500 p-4 fixed top-0 w-full z-50"
      >
        <div class="container mx-auto flex items-center justify-between">
          <h1 class="text-2xl text-white font-bold">My Blog</h1>
          <button
            _="
            on click toggle .hidden on #sidebar 
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
          <div id="menu-list" class="hidden md:flex space-x-4">
            <button
              hx-get="/sport/court"
              hx-target="#content"
              hx-push-url="true"
            >
              Tenis
            </button>
            <button hx-get="/blog/list" hx-target="#content" hx-push-url="true">
              Lista
            </button>
            <button hx-get="/blog/text" hx-target="#content" hx-push-url="true">
              Text
            </button>
            <button
              hx-get="/blog/create"
              hx-target="#content"
              hx-push-url="true"
            >
              Create
            </button>
          </div>
        </div>
        <div
          class="fixed left-0 top-0 h-full w-full z-20 
                text-white 
                hidden md:hidden 
                flex
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
            <div class="p-4 h-full flex flex-col justify-between">
              <a href="/blog/list" class="flex items-center flex-1">
                <i class="material-icons mr-2">description</i>
                <span>About</span>
              </a>
              <a href="/blog/list" class="flex items-center flex-1">
                <i class="material-icons mr-2">description</i>
                <span>About</span>
              </a>
              <a href="/blog/list" class="flex items-center flex-1">
                <i class="material-icons mr-2">description</i>
                <span>About</span>
              </a>
              <a href="/blog/list" class="flex items-center flex-1">
                <i class="material-icons mr-2">description</i>
                <span>About</span>
              </a>
            </div>
          </nav>
          <div
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
