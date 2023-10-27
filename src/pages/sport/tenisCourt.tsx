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
                  _="on pointerdown set $isDragging to true 
                     on pointerup set $isDragging to false 
                     on pointermove (x, y)
                     if $isDragging is true 
                     measure my left then 
                     set centerX to left + 80 then 
                     measure my bottom then
                     set centerY to bottom - 80 then 
                     set positionX to x - (left + 80) then
                     set positiony to y - (bottom - 80) then
                     set positionXSquare to (positionX) * (positionX) then 
                     
                     set positionYSquare to (positiony) * (positiony) then 
                    
                     js(positionXSquare, positionYSquare)
                     return Math.sqrt(positionXSquare + positionYSquare) end then log it then
                     if it <= 79 
                     add  .bg-red-500 to me then 
                     remove .bg-blue-500 from me
                     else log 'ulazi ovde!' then add .bg-blue-500 to me then 
                     remove .bg-red-500 from me"
                  class="w-full h-full rounded-full bg-blue-500 absolute"
                ></div>
                <div
                  _="on pointerdown set $isDragging to true then log $isDragging
                     on mouseup set $isDragging to false then log $isDragging"
                  class="w-20 h-20 rounded-full bg-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ></div>
              </div>
              <output>--</output>
              {/* <button _="on click set x to 10 then log x">Click Me</button>
              <output>--</output> */}
              <div>
                <button _="on click measure my width then log width">
                  Click Me
                </button>
              </div>
              <div
                _="on click (x,y) measure my bounds then log it then 
                set shapeWidth to bounds.width then 
                set shapeHeight to bounds.height then 
                js ( shapeWidth) return shapeWidth / 2 end then
                set distanceToEnd to it then log distanceToEnd then

                js ( shapeHeight ) return shapeHeight / 2 end then
                set heightToEnd to it then log heightToEnd then


                set shapeLeft to bounds.left then log shapeLeft then
                set shapeTop to bounds.top then log shapeTop then
                set centerX to (shapeLeft + distanceToEnd) then log centerX
                set centerY to (shapeTop + heightToEnd) then log centerY then log x then log y then
                js (x, y, centerX, centerY) 
                
                return Math.sqrt((x - centerX) ** 2 + (y - centerY) **2) end then set length to it then

                log length then 

                js (x, y, centerX, centerY) 
                
                return Math.atan2(x - centerY, y - centerX) end then set angle to it then
                  
                log angle then 

                log #line then add {top: ${centerY}px; left: ${centerX}px; width: ${length}px; background-color: red;
              
              transform: rotate(${angle}rad);
              } to #line then log #line
                
                "
                id="container"
                class="relative bg-white p-6 h-40 rounded-lg shadow-md"
              >
                <div id="line" class="absolute bg-blue-500"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="line"
          class="absolute bg-blue-500"
          style="top: 452px; left: 609.25px; width: 142.675px; background-color: red; transform: rotate(3.05267rad);"
        ></div>
        <div>
          <div style="width: 100px; height: 2px; background-color: blue;"></div>
        </div>
      </BaseHtml>
    );
  });
