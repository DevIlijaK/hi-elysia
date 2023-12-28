import Elysia, { t } from "elysia";
import { InsertBlog, blog } from "../../db/schema/blog";
import { ctx } from "../../context/context";
import { html } from "@elysiajs/html";
import { db } from "../../db";
import * as fs from "fs";
import { eq } from "drizzle-orm";

export const blogController = new Elysia({
  prefix: "/blog",
})
  .use(ctx)
  .get("/posts/:page", async ({ db, params: { page } }) => {
    const pageSize = 9;
    const blogPosts = await db
      .select()
      .from(blog)
      .limit(pageSize)
      .offset(pageSize * Number(page));

    let html: Children[] = [];

    blogPosts.forEach((blogPost) => {
      html.push(
        <div
          class="bg-white transform transition-transform hover:scale-125 rounded shadow-md p-4 h-60
            flex items-center  justify-center
              md:justify-start"
        >
          <div class="mr-4 ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCWCuRr561z0xxOwIh3uGZVZBrU_ZmFcM1uQ&usqp=CAU"
              alt="Blog Post Image"
              class="w-16 h-16 object-cover rounded-full"
            />
          </div>
          <div>
            <h2 class="text-xl font-semibold">{blogPost.blogTitle}</h2>
            <p class="text-gray-500">Posted on October 31, 2023</p>
            <p class="mt-4">{blogPost.blogBody}</p>
          </div>
        </div>
      );
    });
    return html.join(" ");
  })
  .post(
    "/create",
    async ({ body: { blogTitle, mainBlogPicture, blogBody }, session, db }) => {
      const imageType = extractFileNameFromPath(mainBlogPicture.type);
      /**
       * Ovaj path mora da se promeni kada ode na produkciju
       */
      const pathToMainBlogPicture = `/home/ilijak/Desktop/projekti/hi-elysia/pictures/${blogTitle}.${imageType}`;
      const nesto = await Bun.write(
        pathToMainBlogPicture,
        await Bun.readableStreamToBlob(mainBlogPicture.stream())
      );
      // await db.transaction(async (tx) => {
      const newBlog = {
        blogTitle,
        blogBody,
        author: "ilija",
        url: "ilija",
        publicationDate: new Date(),
        pathToMainBlogPicture,
        typeOfMainBlogPicture: mainBlogPicture.type,
      } satisfies InsertBlog;
      console.log(newBlog);
      await db.insert(blog).values(newBlog);
      // });
    },
    {
      body: t.Object({
        /**
         * Ovo treba da se podesi kao validacija
         */
        blogTitle: t.String({ maxLength: 100, minLength: 1 }),
        mainBlogPicture: t.File(),
        blogBody: t.String({ maxLength: 3000, minLength: 1 }),
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
    return filePath; // If no slash is found, return the original path
  }
}
