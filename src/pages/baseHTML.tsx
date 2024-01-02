export const BaseHtml = async ({ children }: PropsWithChildren) => {
  const proba = await Bun.file("public/style.css");
  console.log("proba je: ", proba);
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>THE BETH STACK</title>
        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {/* <link rel="stylesheet" href="public/style.css" /> */}
        <style>{await Bun.file("public/style.css").text()}</style>

        {/* <script>htmx.config.globalViewTransitions = true;</script>
        <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
        <script src="https://unpkg.com/htmx.org/dist/ext/loading-states.js"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
        <style>
          {`
            [data-loading] {
              display: none;
            }
          `}
        </style>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css"
        />
        <link rel="stylesheet" href="/public/dist/unocss.css" />
        <script type="text/hyperscript">
          {`
          def copySelectorToClipboard(selector)
            get the innerHTML of selector
            call navigator.clipboard.writeText(the result)
          end
        `}
        </script>
        <script>{safeScript}</script> */}
      </head>
      <div>
        <div
          id="proba123"
          class="z-10 
          fixed 
          top-1/2 
          left-1/2 
          transform -translate-x-1/2 -translate-y-1/2 
          h-24 
          w-24 
          border-solid border-2
        border-indigo-600"
        ></div>
      </div>
      <body class="select-none">{children}</body>
      <script>{await Bun.file("public/script.js").text()}</script>
    </html>
  );
};
