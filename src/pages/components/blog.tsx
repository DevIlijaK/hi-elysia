import Elysia from "elysia";
import { BaseHtml } from "../baseHTML";
import { SideNav } from "./sidenav";
import { UploadPicture } from "./uploadPicture";

export const blog = new Elysia({
  prefix: "/blog",
})
  .get("/list", () => {
    let pageCount = 0;
    return (
      <BaseHtml>
        <SideNav>
          <main class="container mx-auto py-8">
            <div
              hx-get="/blog/posts/${$page}"
              hx-trigger="load, from:#leftButton"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
            ></div>
            <div id="pagination-controls" class="flex justify-center mt-4">
              <button
                class="mx-2 p-2 bg-blue-500 text-white rounded hidden"
                id="leftButton"
                _="on click decrement $page then log $page"
              >
                &lt;&lt;
              </button>
              <button class="mx-2 p-2 bg-blue-500 text-white rounded">1</button>
              <button
                class="mx-2 p-2 bg-blue-500 text-white rounded"
                _="on click increment $page then log $page then if $page is greater than 0 remove .hidden from #leftButton"
              >
                &gt;&gt;
              </button>
            </div>
          </main>
        </SideNav>
      </BaseHtml>
    );
  })
  .get("/text", () => {
    return (
      <BaseHtml>
        <SideNav>
          <div class="bg-gray-100 p-8">
            <div class="w-4/5 mx-auto bg-white p-8 rounded shadow-md">
              <h1 class="text-2xl font-bold">Blog Post Title</h1>
              <p class="text-gray-500">Published on October 30, 2023</p>
              <p class="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                tincidunt orci et sapien lacinia, sed fringilla libero
                tincidunt. Nulla facilisi. Curabitur a nibh a metus fringilla
                dignissim. Proin auctor, justo nec eleifend varius, purus libero
                dictum orci, non cursus velit risus a dui. Cras eu libero nec
                odio convallis malesuada id a nulla. Integer ac eros risus.
                Aliquam dignissim fringilla neque non vulputate. Vivamus laoreet
                ex non arcu tristique, ac ultricies nulla mattis. Nullam
                consequat vitae sem nec euismod. Vivamus a purus eu lectus
                euismod scelerisque. Pellentesque placerat eleifend nibh, in
                cursus justo vulputate non. Fusce nec sem tincidunt, varius
                purus sit amet, posuere est. Donec vel est et urna cursus varius
                ac id sem. Suspendisse facilisis sapien id bibendum vulputate.
                Sed euismod turpis sed nunc dictum, et lacinia lectus auctor.
                Fusce eget sollicitudin ipsum. Sed a vehicula ex. Phasellus nec
                enim nec metus tristique varius. Sed iaculis est eu eros congue,
                nec laoreet orci vehicula. Maecenas eu aliquam tortor. Nulla
                facilisi. Sed ac congue tortor. Integer efficitur eleifend
                fringilla. Sed sed nulla a purus cursus egestas id a mi. Nam
                efficitur, leo a tincidunt tristique, augue erat egestas eros,
                nec pharetra justo justo in ipsum. Vestibulum vehicula dolor vel
                purus convallis, nec vestibulum ligula hendrerit. Nunc sagittis
                justo et nunc feugiat, ac blandit arcu bibendum. Quisque in
                varius ex. Sed euismod sapien at lacus scelerisque, et finibus
                erat euismod. Sed ut aliquet ex. Fusce ultrices et justo at
                facilisis. Vivamus ut quam a massa hendrerit egestas. Sed non
                tristique nunc. Sed ut metus nunc. Pellentesque sed congue nisl.
                Nulla facilisi. Nullam ullamcorper, nulla a mattis mattis, eros
                est fermentum sem, ac vulputate leo velit at ante. Nam et est eu
                massa elementum tristique. Sed rhoncus bibendum tortor, et
                lacinia turpis viverra eu. Nulla sit amet lectus lectus. Sed et
                vehicula nulla. Nullam non lorem eu tellus tincidunt hendrerit.
                Sed sollicitudin ligula nec est laoreet malesuada. Mauris
                rhoncus luctus lectus, in pharetra ante. Nunc interdum libero
                vitae velit convallis vehicula. Integer at venenatis neque.
                Vivamus vitae libero in risus facilisis iaculis. Suspendisse
                potenti. Nulla eget fermentum purus. Sed a nulla tincidunt,
                pellentesque ipsum eget, varius nunc. Integer non lorem a ligula
                interdum ullamcorper. Integer ac justo nec mi aliquam varius.
                Sed suscipit, odio ut bibendum volutpat, nulla arcu posuere
                odio, quis dignissim odio ex nec urna. Sed varius euismod odio,
                eget accumsan mi fermentum vel. Praesent sit amet varius est.
                Nullam ac purus eu nunc dictum volutpat ac eu nulla. Sed eget
                urna fringilla, tristique dolor sit amet, egestas quam. Sed sit
                amet purus fringilla, bibendum neque sed, ullamcorper dui.
                Integer ac odio eu neque mattis gravida. Nulla euismod orci eu
                lectus cursus, ac pharetra purus varius. Vivamus bibendum ac
                nisi eu iaculis. Vivamus at dui dolor. Nunc ac consectetur eros.
                Sed sit amet malesuada ex, vel ullamcorper purus. Nullam a dolor
                a urna rhoncus venenatis ut in nulla. Mauris non posuere libero,
                id eleifend dui. Cras ut orci aliquam, volutpat elit in, iaculis
                nisl. Nulla congue semper libero. Etiam aliquet eget elit ac
                efficitur. Quisque suscipit aliquet tellus, eu luctus mi feugiat
                a. Vivamus malesuada euismod turpis, id volutpat urna. Integer
                sit amet justo in neque vestibulum aliquam. Vestibulum bibendum
                sapien nec lectus efficitur, sed vehicula justo tincidunt. Sed
                sed semper tortor. Morbi vestibulum, dui eget tristique
                fringilla, urna libero fringilla neque, eu euismod arcu felis ac
                justo. Quisque a velit vel orci bibendum euismod. Donec sed
                tincidunt nunc. Curabitur mattis, justo eu volutpat mattis,
                libero lectus posuere risus, in elementum ipsum arcu id leo. Sed
                non ultrices lectus. In interdum nunc id viverra varius. Sed in
                sapien quis purus luctus viverra. Nunc dictum mi id metus
                accumsan, non blandit felis tempor. Phasellus euismod erat et
                augue convallis congue. Etiam volutpat ex sit amet sagittis
                ultrices. Nulla facilisi. Nullam at nulla nec lectus laoreet
                ullamcorper. In vel mi vel massa fringilla hendrerit. Sed non
                nulla odio. Nullam aliquet, dolor id dignissim laoreet, ligula
                orci eleifend libero, vel bibendum risus ante eu orci. Sed
                malesuada varius sapien, a congue massa vestibulum sed. Proin at
                semper quam. Praesent non purus quis metus aliquam ullamcorper
                eu a dui. Morbi scelerisque orci in libero hendrerit, eu
                bibendum erat ultrices. Aliquam bibendum, odio a vehicula
                ultricies, ligula sapien fringilla ex, at bibendum justo urna
                vel tortor. Nulla facilisi. Integer at tristique purus, ac
                condimentum tellus. Nulla facilisi. In malesuada purus vitae
                efficitur. Sed tristique elit sit amet ex dictum, eget blandit
                ipsum bibendum. Sed varius, libero at consectetur viverra, dolor
                orci tincidunt arcu, eget dictum sapien justo ac libero. Sed
                cursus tellus at dolor malesuada, vel tincidunt tortor accumsan.
                Nunc non ultrices justo, non dignissim dolor. Donec in velit ac
                orci lacinia hendrerit
              </p>
            </div>
          </div>
        </SideNav>
      </BaseHtml>
    );
  })
  .get("/create", () => (
    <BaseHtml>
      <SideNav>
        <div class="container mx-auto p-4 mt-8">
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-bold mb-4">Create a Blog Post</h1>
            <form
              action="submit_blog.php"
              method="POST"
              enctype="multipart/form-data"
            >
              <div class="mb-4">
                <label for="title" class="block text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  class="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div class="mb-4">
                <label for="content" class="block text-gray-600">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  class="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <div class="mb-4">
                <label for="image" class="block text-gray-600">
                  Image
                </label>
                <input type="file" id="image" name="image" class="w-full" />
              </div>
              <div class="mb-4">
                <button
                  type="submit"
                  class="bg-blue-500 text-white py-2 px-4 rounded"
                  hx-post="/blog/create"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </SideNav>
    </BaseHtml>
  ))
  .get("/create2", () => (
    <BaseHtml>
      <SideNav>
        <div class="container mx-auto py-8 select-none ">
          <form class="bg-white p-4 rounded shadow-lg">
            <label for="blogTitle" class="block text-xl font-bold mb-2">
              Blog Title:
            </label>
            <input
              type="text"
              id="blogTitle"
              name="blogTitle"
              class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <h1 id="blogPreview" class="text-xl font-bold mb-2">
              Preview Title
            </h1>
            <UploadPicture />
            <label for="blogBody" class="block text-xl font-bold mb-2">
              Blog Body:
            </label>
            <textarea
              id="blogBody"
              name="blogBody"
              rows="10"
              class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your blog body here..."
            ></textarea>
          </form>
        </div>
      </SideNav>
    </BaseHtml>
  ));
