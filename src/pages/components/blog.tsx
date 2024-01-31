import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { ctx } from "../../context/context";
import { blog } from "../../db/schema/index";
import { UploadPicture } from "./uploadPicture";
import { html } from "@elysiajs/html";
import { cache } from "elysia-cache";
import { SelectBlog } from "../../db/schema/blog";

export const blogPages = new Elysia({
  prefix: "/blog",
})
  .use(ctx)
  .use(html())
  .use(cache())
  .get("/list", () => {
    let pageCount = 0;
    return (
      <div class="h-full flex items-start justify-center">
        <div id="blogGrid" class="blogGrid"></div>
      </div>
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
  .get("text/:title", async ({ params, db, cache }) => {
    let selectedBlog = cache.get(params.title);

    if (!selectedBlog) {
      selectedBlog = (
        await db.select().from(blog).where(eq(blog.searchTitle, params.title))
      )[0];
      cache.set(selectedBlog.title, selectedBlog);
    }
    const pathToMainBlogPicture = selectedBlog.pathToMainBlogPicture;
    const file = Bun.file(pathToMainBlogPicture);

    const dataUrl = `data:image/png;base64,${Buffer.from(
      await file.arrayBuffer()
    ).toString("base64")}`;
    console.log("Stiglo");
    return (
      <div class="blogTextContainer p-4" style=" overflow-x: hidden;">
        <h1>{selectedBlog.title}</h1>
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
        {/* <textarea
          id="blogBody"
          name="blogBody"
          rows="10"
          class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your blog body here..."
        > */}
        <div class="w-full">
          <pre style="white-space: pre-wrap;">{selectedBlog.blogBody}</pre>
        </div>
        {/* </textarea> */}
      </div>
    );
  })
  .get("/create", () => {
    console.log("Ulazi ovde!");
    return (
      <div class="container mx-auto select-none ">
        <form
          class="bg-white p-4 rounded shadow-lg"
          method="POST"
          enctype="multipart/form-data"
          hx-post="/blog/new/create"
          hx-include="[name='mainBlogPicture']"
        >
          <label for="title" class="block text-xl font-bold mb-2">
            Blog Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
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
    );
  });
