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
                _="on click (x,y) measure my bounds then 
                set shapeWidth to bounds.width then 
                set shapeHeight to bounds.height then 
                js ( shapeWidth) return shapeWidth / 2 end then
                set distanceToLeft to it then 
                js ( shapeHeight ) return shapeHeight / 2 end then
                set heightToTop to it then 

set pointX to x - bounds.left then 
set pointY to y - bounds.top then 

                js (pointX, pointY, distanceToLeft, heightToTop) 
                
                return Math.sqrt((pointX - distanceToLeft) ** 2 + (pointY - heightToTop) **2) end then set length to it then


                js (pointX, pointY, distanceToLeft, heightToTop) 
                
                return Math.atan2( pointY - heightToTop, pointX - distanceToLeft) end then set angle to it then  
                 add {
                  top: ${heightToTop}px; 
                  left: ${distanceToLeft}px; 
                  width: ${length}px; 
                  height: 2px; 
                  background-color: red;
                  transform: rotate(${angle}rad);
                  transform-origin: top left;
              } to #line 
               then measure #div1 bounds then set divBounds to bounds then
               
               measure #line bounds then set lineBounds to bounds then log lineBounds then  
               
//                if((lineBounds.bottom >= divBounds.bottom) or (lineBounds.) and (y >= it.y) and (y <= it.y + it.height))
// remove .bg-red-500 from #div1 then
//                 add  .bg-blue-500 to #div1 end
                
                
                "
                id="container"
                class="relative bg-white p-6 h-80 rounded-lg shadow-md"
              >
                <div id="line" class="absolute"></div>
                <div
                  _="on click measure my top then log it"
                  id="div1"
                  class="absolute bg-red-500"
                  style="width: 50px; height: 50px; top: 100px; left: 100px;"
                ></div>
                <div
                  id="div2"
                  class="absolute bg-green-500"
                  style="width: 50px; height: 50px; top: 200px; left: 200px;"
                ></div>
              </div>
            </div>
            <div>
              <div class="relative ">
                <div
                  class="absolute hidden top-0 left-0 bg-white h-80 w-80 rounded-lg shadow-md overflow-hidden"
                  id="imageSun"
                >
                  <img
                    src="https://pngfre.com/wp-content/uploads/sun-50-1024x1024.png"
                    alt="proba"
                  />
                </div>
                <div
                  class="absolute top-0 left-0 bg-white h-80 w-80 rounded-lg shadow-md overflow-hidden"
                  id="imageMoon"
                >
                  <img
                    src="https://cdn.mos.cms.futurecdn.net/DrRN4BTQ9Wk8fHdGjKB2A.jpg"
                    alt="proba"
                  />
                </div>
              </div>
              <div>
                <button
                  style="transition: all 900ms ease-in"
                  _="on click if(#imageSun match .hidden) add .hidden to #imageMoon then settle then remove .hidden from #imageSun
                  else add .hidden to #imageSun then settle then remove .hidden from #imageMoon"
                  class="absolute bg-blue-500 hover:bg-blue-700 active:bg-blue-800 
              text-white font-semibold py-2 px-4 h-16 rounded"
                >
                  Uradi
                </button>
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
