export const BaseHtml = async ({ children }: PropsWithChildren) => {
  const proba = await Bun.file("public/style.css");
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
        <style>{await Bun.file("public/css/style.css").text()}</style>
      </head>

      <body class="select-none">{children}</body>
      <script>{await Bun.file("public/js/variables.js").text()}</script>
      <script>{await Bun.file("public/js/script.js").text()}</script>
      {/* <script>{await Bun.file("public/js/falling.js").text()}</script> */}
      <script>{await Bun.file("public/js/obliqueThrow.js").text()}</script>
      <script>{await Bun.file("public/js/gravity.js").text()}</script>
    </html>
  );
};
