import Elysia from "elysia";

export const sidenav = new Elysia({
  prefix: "/sidenav",
})
  .get("/hidden", () => (
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
  ))
  .get("/exposed", () => (
    <div
      class="fixed left-0 top-0 h-full w-full z-20 
                text-white 
                md:hidden 
                flex
                "
      id="sidebar"
    >
      <nav
        id="nav"
        class="
            h-full w-64 bg-gray-800 
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
  ));
