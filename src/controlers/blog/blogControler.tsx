import Elysia, { t } from "elysia";
import cache from "elysia-cache";
import os from "os";
import path from "path";
import { ctx } from "../../context/context";
import { InsertBlog, blog } from "../../db/schema/blog";
import { createImageULR } from "../../lib";

export const blogController = new Elysia({
  prefix: "/blog",
})
  .use(ctx)
  .use(cache())
  .get("/posts/:page", async ({ db, params: { page } }) => {
    const pageSize = 9;
    const blogPosts = await db
      .select()
      .from(blog)
      .limit(pageSize)
      .offset(pageSize * Number(page));

    let html: Children[] = [];
    const imageUrl = await createImageULR("pictures/platform.png", "png");
    const divBackgound = `background-image: url('${imageUrl}')`;
    blogPosts.forEach((blogPost) => {
      const getLink = `/blog/text/${blogPost.title}`;
      html.push(
        <div class="h-60 bg-white rounded-md shadow-md border border-gray-300 flex flex-col">
          <div
            class="p-4 pb-0 h-48 flex items-center justify-center md:justify-start"
            hx-get={getLink}
            hx-target="#content"
          >
            <div class="mr-4 ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCWCuRr561z0xxOwIh3uGZVZBrU_ZmFcM1uQ&usqp=CAU"
                alt="Blog Post Image"
                class="w-16 h-16 object-cover rounded-full"
              />
            </div>
            <div>
              <h2 class="text-xl font-semibold">{blogPost.title}</h2>
              <p class="text-gray-500">Posted on October 31, 2023</p>
              <p class="mt-4">123</p>
            </div>
          </div>
          <div style="height: 50px;" class="ramp rounded-b-md overflow-hidden">
            <div class="h-full">
              <img
                src={imageUrl}
                alt="Blog Post Image"
                class="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      );
    });
    return html.join(" ");
  })
  .post(
    "/new/create",
    async ({ body: { title, mainBlogPicture, blogBody }, db, cache }) => {
      console.log("Ulazi ovde!");
      const imageType = extractFileNameFromPath(mainBlogPicture.type);

      const imageName = extractContentFromHtml(title);
      /**
       * Ovaj path mora da se promeni kada ode na produkciju
       */
      const homeDirectory = os.homedir();
      const pathToMainBlogPicture = path.join(
        homeDirectory,
        "/",
        "app",
        "images",
        `${imageName}.${imageType}`
      );
      const nesto = await Bun.write(
        pathToMainBlogPicture,
        await Bun.readableStreamToBlob(mainBlogPicture.stream())
      );
      // await db.transaction(async (tx) => {
      const newBlog = {
        title: imageName,
        titleHtml: title,
        blogBody,
        author: "ilija",
        url: "ilija",
        publicationDate: new Date(),
        pathToMainBlogPicture,
        typeOfMainBlogPicture: mainBlogPicture.type,
      } satisfies InsertBlog;
      console.log(newBlog);
      await db.insert(blog).values(newBlog);
      cache.set(newBlog.title, newBlog);
      // });
    },
    {
      body: t.Object({
        /**
         * Ovo treba da se podesi kao validacija
         */
        title: t.String({ maxLength: 100, minLength: 1 }),
        mainBlogPicture: t.File(),
        blogBody: t.String({ maxLength: 30000, minLength: 1 }),
        // author: t.String(),
        // url: t.String(),
      }),
    }
  );

function extractFileNameFromPath(filePath: string): string {
  const lastSlashIndex = filePath.lastIndexOf("/");
  if (lastSlashIndex !== -1) {
    return filePath.slice(lastSlashIndex + 1);
  } else {
    return filePath;
  }
}
function extractContentFromHtml(htmlString: string): string {
  const startIdx = htmlString.indexOf(">") + 1;
  const endIdx = htmlString.indexOf("<", startIdx);

  if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
    // Extract content between the first '>' and second '<'
    return htmlString.substring(startIdx, endIdx).trim();
  }
  throw new Error(
    "Content between tags not found in the provided HTML string."
  );
}
