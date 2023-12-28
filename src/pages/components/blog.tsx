import Elysia from "elysia";
import { BaseHtml } from "../baseHTML";
import { SideNav } from "./sidenav";
import { UploadPicture } from "./uploadPicture";
import { ctx } from "../../context/context";
import { eq } from "drizzle-orm";
import { blog } from "../../db/schema/index";

export const blogPages = new Elysia({
  prefix: "/blog",
})
  .use(ctx)
  .get("/list", () => {
    let pageCount = 0;
    return (
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
    );
  })
  .get("/text", () => {
    return (
      <div
        class="container mx-auto select-none"
        hx-get="/blog/text/123"
        hx-trigger="load"
      ></div>
    );
  })
  .get("text/:blogTitle", async ({ params, db }) => {
    console.log("Parametri su: ", params.blogTitle);
    const selectedBlog = (
      await db.select().from(blog).where(eq(blog.blogTitle, params.blogTitle))
    )[0];
    const pathToMainBlogPicture = selectedBlog.pathToMainBlogPicture;

    const file = Bun.file(pathToMainBlogPicture);
    const bufferedArray = await file.arrayBuffer();

    const bytes = new Uint8Array(bufferedArray);
    const binaryString = String.fromCharCode.apply(null, bytes);

    const base64String = btoa(binaryString);

    const dataUrl = `data:${selectedBlog.typeOfMainBlogPicture};base64,${base64String}`;

    return (
      <div class="bg-white p-4 rounded shadow-lg">
        <h1>{selectedBlog.blogTitle}</h1>
        <div style="aspect-ratio:3.2/1;" class="mt-6 mb-6 relative bg-blue-300">
          <div
            id="imageDiv"
            style="aspect-ratio:3.2/1;"
            class="flex items-center justify-center"
          >
            <img
              id="imagePreview"
              src={dataUrl!}
              alt="Preview"
              class="object-cover w-full h-full"
            />
          </div>
        </div>
        <textarea
          id="blogBody"
          name="blogBody"
          rows="10"
          class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your blog body here..."
        ></textarea>
      </div>
    );
  })
  .get("/create", () => (
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
  ))
  .get("/create2", () => (
    <div class="container mx-auto select-none ">
      <form
        class="bg-white p-4 rounded shadow-lg"
        method="POST"
        enctype="multipart/form-data"
        hx-post="/blog/create2"
        hx-include="[name='mainBlogPicture']"
      >
        <label for="blogTitle" class="block text-xl font-bold mb-2">
          Blog Title:
        </label>
        <input
          type="text"
          id="blogTitle"
          name="blogTitle"
          class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        {/* <h1 id="blogPreview" class="text-xl font-bold mb-2">
              Preview Title
            </h1> */}
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
        <div class="mb-4">
          <button
            type="submit"
            class="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  ));
