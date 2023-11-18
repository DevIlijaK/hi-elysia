export const BaseHtml = ({ children }: PropsWithChildren) => (
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
    <body hx-boost="true" hx-ext="loading-states">
      {children}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>{" "}
    </body>
  </html>
);
