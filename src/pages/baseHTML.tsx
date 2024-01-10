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
      {/* <h3>Throttling requestAnimationFrame to a FPS</h3>
      <p>This test: Results should be approximately 5 fps</p>
      <p id="results">Results:</p>
      <canvas id="canvas" width="300" height="300"></canvas> */}
      <div>
        <div
          id="proba123"
          class="z-10 
          fixed 
          top-1/2 
          h-24 
          w-24 
          border-solid border-2
        border-indigo-600"
        >
          <img
            id="image123"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIVFhUXGBcXFhcVFRUVGBgYFxcYGBUXFRcYHSggGBolHRUVITEhJSkrLi4uFx80OTQtOCgtLisBCgoKDg0OGxAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOAA4AMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAABQMEBgIBBwj/xAA8EAABAgMGAgcGBQQCAwAAAAABAAIDBBEFEiExQVFhcQYigZGhsfATMkLB0eEHUmJykhSCsuIzNBUWJP/EABoBAAEFAQAAAAAAAAAAAAAAAAABAgMEBgX/xAAzEQACAQIDBgUEAQQDAQAAAAAAAQIDEQQhMQUSQVFxoRMiYZHwgbHB0RQjMjNSYuHxBv/aAAwDAQACEQMRAD8A+GoQhAAhCEACEIQAIXQCbStjuOLzdG2v2TZzUVdk+Hw1XES3acb/AGXV/PQUq/AsqK74bo/UaeGaey8uxnuNp+r4v5KYjCpwG5VSWKbyijv0dhQit6vP6LJe717CqHYrR7zieQp5q3Cs+E3KHXnUojWixvugu8FUdartwBwojdrT1dglitm4Z2p01J87X7yzGLYDdIbf4tUgYfygdiTtthw1J7lDEtJxx+6T+NJ6sV7eppeSnn1X4TY+9kdgozAac4YP9rQkDZ1wxqa88lNDteJUVd4BK8LJaMSO3qb/AMlP7P7jKLZ8J2cOnKoVWLYrfhcRzFfJSwrYBcatwNKAfNX20Iq01CY/Fp8SzSez8a2t1X6br91Zmdj2XEb8N4fpNfDNUCtgopiXY/321/V8X8k+GK/2RBiNgRedGVnyenutPZmSQnE1Y7hiw3htr90pIVuM1JXRnsRhquHlu1I2+z6P56nKEITiAEIQgAQhCABCEIAEIQgAVyTk3RD1ctXHIc1PZ1nl/WODfPgPqnzGBoAAugaBV61dQyWp2tnbJlXtUq5Q7v8AS9ePDmQykkyGOqMfzOwP2U66htJwCinJtsMGhBfUCm25+SopSqS5s0lSrQwdLhFLRL8eoTUy2GKnPQfVIpmdc81J7Bkoojy41JqoXLoUqSh1MjjcfUxUvNlHgvmp02MQcCo3roBe0UpQOAvaoDUUSiHq8C9XjQgCRqZ2ZOFtG6VxS0BTSzsa7JrSazHwlKMrxdmaN4oea5XUrFDw0AZNxPIYALlcupBwdmbzB4qOIp78ej62BQTcmyIOsKO/M3E/7KdCapOLuiepShVjuTV1yZmZyTdDPWy0cMjyVNbF7AQQReB0KQ2jZ5Z1hizxHA/VdCjXU8nqZPaOyZUL1KWcO6/a9ffmLEIQrBxQQhCABCEIAEysyRvmp9weJ2ChkZQxHXdM3HYbrSsYAAAKAZKvXrbistTtbJ2d48vFqLyLu/0uPPTme5YDABCF6BVc41+h1EJbDe4UrQ081lnOqnttTIDQxrxXG9Tgs+Suhh4uMMzGbXrqriPLosj3ReiGvWNqmEtZ5IvHLxKnbsc1K+guuKRsElPIVmjUKw2TA0THUJFSbEUKRJ0U3/i3UWghQQr0CACmuoSKgjFRrPcNFB7A7L6PDs8HRRzHR4HIJVVGugz577IqaHCNKLey/RgYdXXfFOf/AEdhaKVBPrdL4iG+Cz5vLTN1wAwpn902mCCGuApUVVy3eiMWXN8NvNObqVpjqqs4chsFBiGnE7Gw1NVmuFvoVkIQqRqgXueBxBXiEAILTkbhq33T4cCli2Lmgggi8Dms1PShhuu6ZtO43XRoVt9Wepj9rbO8CXi015H2f6fDlpyKaEIVg4oLoBcpxYctV3tDk3Ln9vmmzkoxuyxhcPLEVVTjx7Li/nQaSMqIbLvxHF3YpkIXJk3J3ZvqdONOChBZLJAiJFuNc/UDD5IVK2n0Y1u5J8Pun0o700irtGs6WGnJa2svq7fkUPfVcNapGsU0NmIXTMNYkk4etFo5aGLoSmWZj69BOpXJRTZPSR1cXohKYNUgCiLKIWMVyVUd1WILaIHIbSgCYw4KVyzsk3lXiiQVotwIQHNM5SJiAk/tKK1KxeKchjNMJNkVha4Agggr4z0zsgy0wWHIgEcjUDyX2KzIqy34u2XegwpkZw3XHftdUg9jhT+9FaN4XLOy6vh4pJ6Sy/Xc+ToQhUTWghCECgoZ6V9oy7rm39x+qmQlTad0R1acakHCayeTMeQuU4tyWo4PGTs+f3SddaElJXRgMTh5Yeq6cuHdcH86HVFrJWBcYGbe9+7VIrHg3oo2bV3dl40WhVTFT0iaDYGHtGVZ8cl01fvoCEIVM0YJZbZxaNh5k/RM0ptY1i8gB4V+asYZef6HF27O2GS5yXa7/BUYFbgtpjqoIYVuEPXBXmZNFuXCaQVQlYJOSZwIVAopMsU0WGrsKK8gxFGWCwFKwqh/UhSQphFhUNoDkzl4mCVyb6phDYkHl1r6q1KVBHr19lSlc02loNQPWqVDXkNbPiEFXrelfbSceHQEuhuu1/MBeZ4gKhIQ8U7gbdilSurFeUt2SkuGfsfnMrxTTkAw3vhnNpc082kg+ShXNN2mnmgQhCBQQhCAI5qBfYWb+7+74Vk1sFnrYg3Yp2dR3fn41VzCz1iZ3b+HvGNZcPK+mq9s/cvWDD6rnbkDux+fgmarWYy7CYN8e8qyoK0rzbOrs+l4eFpx9E/fN92CEIURdBJrR/5n9nkE6GYSKcxiP/cfNWsL/czgf/QP+lBer+3/AGesarkqwlVYfLkmVnNxVtszUVmNpaHdCnUYXMV+Crtl1WSOY0cBJ5+1CcG5bqWPBc84ZL0WaBi40HFSJJakUnKWSFn9e4aqWBbBGaul8BuePrivXPgPwoO0fNOuuRHuy/2Glk2004E0qtVLTIIrwP2WBbIMB6pontmRC0UUcrcCxSctJGulX9Uk7+vkmMpOgCtfQWfgxD7MpVPzMW6Qw48j8k1akktD6ZZ9oMBxIyw5aJ3LR2uxBC/Ogl5xxNLxGxdh3LXdEpybhvaHB1G0GYpTHCuqnRTm78BD0gBEzGBz9q+v8nKgmHSKJemYzt40Q97nlL1zHqbuj/jj0X2BCEJCUEIQgASy3odWNdsSO/H5Jmq1psvQnjbHuKloytNMp7QpeJhpx9G/bNd0TQR1GDZrf8V2hCjeZairJIEIQ3RIOJ2XQKuOO6hjSkOJlgd6U70RnVdTbAJhca1lXeGauQW6rGRxVZ15OUtOC5L5x4mbjy5YcQrlmtxFVambsWGSM6V5UVKRiYhTJ3RzXHdkPqKOI3n4KRjl49yiLNinEeW5NqeXnQpXNQYkR1S6nAY0Tym/douHwWnMDyKVOw1wvkIH2ITka81djyfUbSEGuaKEg+9iTiKZY0TRki74XntAPiuY0u4YFyf4jGOhFZ2Fcs51KEEU0P1TqXiUoqQhgKdjaJjdyWCsbmWuCUdFIJugE0508yvntrdJ3VIYAOA+q+m9BmtjsdBd7rmua7kRQrCTliOY49QYE1ACFZaoWom8osoWLOTT2PitbebDoXhpaXBpBN67hUYHI6L6H0HtVkx1HXSSKgjUduIIpks90elYF6j4QNc668CNVsLO6NwYUeHMSzSwZRGDLEe8KnDQU+6fdXukRbsoq0nc+fdK4QbNxgNz3nF3iSlCsT8x7SK+IfiJd/Ik/NV1Qk7ts21GDhTjF6pJeysCEITSUEIQgAXEZtWPG7Xf4rtCVajZK8WgQuIJ6jDu1v8Aiu0PUIu6TBCEJBxIxnWaeK9nohL7q5h7b4qYMDnC8MRqNVapu6Mvj6HhVXbR5r8r6MkgS4a04Y6pEx4Br3LQNFL3Wrhh2LJB1aY7/JT08zk1naxp5N1QFaDUrsuLgmzCmS1JYO6PPZoEFSAqRpTSWJPKiiq2m5uZXUWaDQk01FLySlsLJ2ARhoFMzFRSkRgGOe2qlhTcJ5o11CNDge4pbDFbmbP8OZm5MAb4J50qgw2RHDJ3vdhx7s1l+i5uRWurqtv+IUKG6UMWoD2XS06kOcGubyN6vMBCV0x0mlNN8chDY8VpIyPmt1JwgW4U9fJfHrJnrrwa6r6n0dnLzQlgJiI+W58SnZd0KI+G7Npc082mh8lXWi/ECBcn443c14/vY13mSs6qMlZtGwo1PEpxnzSfYEIQkJQQhCABCFxHNGvOzXeSVZsbJ2i2Q2W+sJh4U7irKWWBE6jm7EO9d3imafWjabRU2fU8TC05eiXtl+AQhCjLoLtk3R7WOycDQ7OGa4XMQYtPE+RUtJ+Y521Ib2GbWqs+9n2LUxGFRdWYc1amK3AFZ2JDx71dpmRrZ2LdmRaJzKRKlZuUdnyJTiyomJ4Zeu5E4hTlkkNwMacKqraU6IY4roROucdgknSet9o4HxIUcVeViWUnGN0cPtOuOqjdaHHNU2y2VTRXIMk2uZO2CmtFECc5Fc2gVckpwPNC0V0K5fZzK/F3K3JSjGnM8MEj3R8YVLmgsq0IUAtMSISRjdA/ydXAcgexN7QtiHMNcLzqmhxOBIyoMgBXLjxWSjWWXmt8eSYQbMeGkmh1zqcaeV0d6bZEjlNPNFERbj+Fe5fTehU7UA7L5facqRQjMmhHHH6eC+h/h5DIY4u0IHefpU9iRqzHRqXi0xP+J/8A3HHeGyv8VkU86ZzntZyK8Goq0D+0Bp8QUjVKp/e+prsFHdw9Nf8AFAhCEwtAhCEACrWo+kJ54U7yrKWW/E6jG/mx7sPmpaMbzSKW0Kvh4WcvRr6vJd2UbHjXYo2d1e/LxotCsfVayVj32B+/vfu+JT4qGkjlbAxF4yovVZrpo/bL3JEIQqZogXMR4BaK4lxIb2FdJbHg/wD0Ak0HvV2DWZd48VNQipT7nL2vWdLDOyvdpP0v/wCW+o7J6qRTWDuacsi1BBpUZjsr80nnTX1lmrsTJ1NEVGO63MK3KTVD64Km8Zdyjc+hqntEKdh+2PdcOI9eS4t8Vuu7EvbFvOB9afdWLVjVaAmJZk29eLLZlWxGDQ6FesjNhMo9prezArhx4KGyZoEUTF7Q5NZNGzV0WoEaXc93XAFBmboqa1pXs70+kbHhmEHYEmhrmDVZaDItNNANKbpnKWUwHB9Msqj54JlkSqM+Z9AlLFgCHW6zqteQXBpFQ0UzGp8189nrHjxZ2O6ASIAIId8ODG3gAMPeqOxaWR6Lwph7DEiXw3ENJJAOFczrhhwC19twYcvLlsMBop3mmCetCOSs7NnyezpB8SKIbnEgEmvie3DxWyn5j+llnmovuJI0xPVbhwF4qjYkEC88+8TTlofIJD0itb2zzdNWA0HHAVI4YeJTJS3VvEuFoeNVVNaPXotf11aFEWISSTnUk8zmuEIVE2dktAQhCBQQhCABZ62I16Kdm0b3Z+NU8mo9xhft7v7tFlKq5hYayM5t/EWjGitXm+mi98/Y5Tiw5mjiw5Oy57dvySddAq3OKlGzM/hsRLD1Y1I8O64r51NghQSM17Rgd8QwdzP1U65Mk4uzN/SqxqwU4PJ5oqT86WdVvvZucUoe8uNXO701tSXH/JW6eOv3SaJCqulh1HcuteJj9sTr/wAhxqPLWKvlbhlz53zJmRC01aeY3XZmA6qpNeRgVIW1yKlcbnKUrEwdoo5jBc3jkVG+JkjiOuXZdwuEnh4Lkxa5qu2JhRdMdqksLcmgAjEJ5Lxat4pG2MrEKORl62TZJskhNRHAmiCrcvaOKTAE0qmUjJnAkim+fgo2uZOpSvkbzotM0oaY9tFN0ptR0Rt1oq0UyOP3Slk22FANDU7DPnSqXxLRvQqhprkcsaNINRocsDoUiVxZysgtG0LsK609Z9ewAAV8PHgs/XuUkV5JJOZJ7Mag+JUSrVp3dlojS7KwvhUt+S80uy4L8v24AhCFAdUEIQgAQhQT00IbC7U4M5j6JYxcnZEdWpGnBzm8lmxZbkxV3sxk3Pn9gk67J3XC60IqMbIwOKxEsRVdSXHsuC+dQQhCcVy5IzRhuvaZOG42TaNaor1RXnqs6pYUSnJMdKEpXaLlHH4ijT8OnKyvf1+nK/ziWJiYLjUmq6huqFC8jQdq4Y4jPJSaFNtt3buyeIxeMXYeCuC1KIelcPhbKRpQAgCmuw5WXwgVVewhIxTtr1YgxaBUgV21ybYW47lZnVXX2iSOH3Kz7I1PXFdNjElN3SVVGjSsnatu7+se5XoDgG1rgARvntwqR2krMycXQZnDnhl9+CbQQQKVqT4UyUVWShH1LuAw08VWWXlTV/11eWQEoQhc424IQhAAhC9yFTgAgDxzgASTQDNZmemzEde0yaNhsp7Unr5uj3R4ncpYujQo7iu9TH7W2j/Il4VN+Rd3+lw568gQhCsHFBCEIAEIQgD0FdVXC9BQB0HKxDiKugFKIXEKFr9l2IiUDsrgHQ5LsFeFqAOHS1cW48FDSmBCsMfdKZQnw3ikQciMCORRYS9hO1tVfkrOe/IUG51ptumcvYLiawyIjdhg/tbr2VTm3JL2Ey2ECKthQi6mQc4XiB2EJyhzGufI9lbKYJL2rBSJDeYcTKpD6uhvOuhb2N4pctvYbWxA6C/BsdohuOzq1hP5h93sJWYn7KfDJqMjQjOhGC5+Kw8lLeWaNXsPaNKVJUJO0ruy0v05vuL0IQqRowQhQTc42GOtn+VuB/1SpOTsiOpVhTi5zdlzZM5wAqTdA1SG0bQL+qMG+fE/RQTk46IetkMmjIclTXQo0FDN6mT2jtaVf+nSyh3f6Xp78gQhCsHFBCEIAEIQgAQhCABCEIAF7VeIQB0FIH7qFe1QBOTTJdsiqu166vApbiFheNdTBcsPFelOAuQJpzTgSFuejlsNisuRzDdSl32mYGtHDEL53Qr1sYjXxSp2Gyjc+3RJCGWB0B+IxwN4Cmodn5pb0keDE9q2l2KA/DEXnNBitrwcXDuXzixbb9jeBe6jtiT4JhafTIxA0Uc67XF1Ggk5mgrXIDsT1NcSKUG8ki9Hg3iSM9Pt9EsmJhjPfdT9PxfxSabtyM/4ro2Zh45paSqVXD05SvHI7+F21iKVHcmlJ8G29PXn1vfncbTVsOODBdG+v2SklcoUkYRirJHPxGJq4iW9Ulf7LovnqCEITiAEIQgAQhCAP//Z"
          />
        </div>
        {/* <div id="horizontalLine"></div>
        <div id="horizontalLineLowerLeft"></div>
        <div id="horizontalLineLowerRight"></div> */}
      </div>
      {/* <div id="touchpad">
        <div id="indicator">&#x2195;</div>
      </div> */}
      <body
        class="select-none"
        // style="cursor: none;"
      >
        {children}
      </body>
      <script>{await Bun.file("public/variables.js").text()}</script>
      <script>{await Bun.file("public/script.js").text()}</script>
      <script>{await Bun.file("public/falling.js").text()}</script>
    </html>
  );
};
