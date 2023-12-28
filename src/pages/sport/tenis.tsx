import Elysia from "elysia";
import { BaseHtml } from "../baseHTML";
import { SideNav } from "../components/sidenav";

export const tenis = new Elysia({
  prefix: "/tenis",
}).get("", () => (
  <BaseHtml>
    <SideNav>
      <div class="bg-gray-100">
        <div class="container mx-auto p-4">
          <h1 class="text-3xl font-bold mb-4">Tennis Court Reservations</h1>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded shadow">
              <h2 class="text-xl font-semibold mb-2">Court 1</h2>
              <button class="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
                Reserve
              </button>
            </div>

            <div class="bg-white p-4 rounded shadow">
              <h2 class="text-xl font-semibold mb-2">Court 2</h2>
              <button class="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  </BaseHtml>
));
