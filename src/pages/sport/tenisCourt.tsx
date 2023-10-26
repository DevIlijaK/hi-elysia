import { html } from "@elysiajs/html";
import Elysia from "elysia";
import { BaseHtml } from "../baseHTML";

export const court = new Elysia({
  prefix: "/court",
})
  .use(html())
  .get("", () => {
    return (
      <BaseHtml>
        <div class="grid grid-cols-2 gap-4">
          <div
            class="h-screen bg-cover bg-center"
            style="background-image: url('https://d26itsb5vlqdeq.cloudfront.net//image/3A203E31-AF91-4A97-96F3B23C85C04010');"
          ></div>

          <div class="bg-white p-4 rounded shadow">
            <h2 class="text-xl font-semibold mb-2">Court Information</h2>
            <h3 class="text-lg font-semibold my-2">Court Name</h3>
            <div class="reservation">
              <h4 class="text-lg font-semibold my-2">Available Periods</h4>
              <div class="period">
                <span>8:00 AM - 9:00 AM</span>
                <button class="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
                  Reserve
                </button>
              </div>
              <div class="w-40 h-40 relative">
                <div
                  _="on pointerdown set $isDragging to true then log $isDragging
                     on pointerup set $isDragging to false then log $isDragging
                     on pointermove if $isDragging is true add  .bg-red-500 to me else log $isDragging"
                  class="w-full h-full rounded-full bg-blue-500 absolute"
                ></div>
                <div
                  _="on pointerdown set $isDragging to true then log $isDragging
                     on mouseup set $isDragging to false then log $isDragging"
                  class="w-20 h-20 rounded-full bg-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ></div>
              </div>
              {/* <button _="on click set x to 10 then log x">Click Me</button>
              <output>--</output> */}
              <button _="on mouseup set x to 10 then log x on mousedown set x to 11 then log x">
                Click Me
              </button>
            </div>
          </div>
        </div>
      </BaseHtml>
    );
  });
