export const Header = () => {
  return (
    <header
      // _="on load measure my bounds then add {
      //           margin-top: ${bounds.height}px;
      //       } to #content"
      id="header"
      class="bg-blue-500 p-4 w-full z-50"
    >
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-2xl text-white font-bold">My Blog</h1>
        <button
          _="on click toggle .w-full on  #nav
               then toggle .w-0 on #nav"
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
          <button hx-get="/blog/list" hx-target="#content" hx-push-url="true">
            Lista
          </button>
          <button hx-get="/blog/text" hx-target="#content" hx-push-url="true">
            Text
          </button>
          <button hx-get="/blog/create" hx-target="#content" hx-push-url="true">
            Create
          </button>
        </div>
      </div>
      <nav
        id="nav"
        class="
            fixed left-0 top-0 h-full w-0 bg-gray-800 flex
            transition-all duration-500 ease-out 
            overflow-hidden
            "
      >
        <div class="p-4 h-full w-48 flex flex-col justify-between">
          <button
            hx-get="/blog/list"
            hx-target="#content"
            hx-push-url="true"
            class="flex items-center flex-1"
            _="on click toggle .w-full on  #nav
                 then toggle .w-0 on #nav"
          >
            <i class="material-icons mr-2">description</i>
            <span>List</span>
          </button>

          <button
            hx-get="/blog/text"
            hx-target="#content"
            hx-push-url="true"
            class="flex items-center flex-1"
            _="on click toggle .w-full on  #nav
                 then toggle .w-0 on #nav"
          >
            <i class="material-icons mr-2">description</i>
            <span>Text</span>
          </button>
          <button
            hx-get="/blog/create"
            hx-target="#content"
            hx-push-url="true"
            class="flex items-center flex-1"
            _="on click toggle .w-full on  #nav
                 then toggle .w-0 on #nav"
          >
            <i class="material-icons mr-2">description</i>
            <span>Lista</span>
          </button>
        </div>
        <div
          class="
            h-full 
            flex-1 
            bg-black 
            opacity-50
            w-full
            "
          _="
            on click toggle .w-full on  #nav
            then toggle .w-0 on #nav
            "
          id="sidenavClose"
        ></div>
      </nav>
    </header>
  );
};
