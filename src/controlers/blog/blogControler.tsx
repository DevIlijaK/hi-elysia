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
  .get("/file123", ({ set }) => {
    var ambientSound = Bun.file("public/sound/ambient.wav");
    set.headers["Content-Type"] = ambientSound.type;
    set.headers["HTML"] = "false";
    console.log("Ulazi ovde! ");

    return ambientSound;
  })
  .post(
    "/posts",
    async ({ db, body: { page, offset } }) => {
      const pageSize = offset;
      const blogPosts = await db
        .select()
        .from(blog)
        .limit(pageSize)
        .offset(pageSize * page);

      let html: Children[] = [];
      const imageUrl = await createImageULR(
        "public/images/platform.png",
        "png"
      );
      const divBackgound = `background-image: url('${imageUrl}')`;
      blogPosts.forEach((blogPost) => {
        const getLink = `/blog/text/${blogPost.title}`;
        html.push(
          <div class="blogWrapper" style="color:white;">
            <div class="blogCart" hx-get={getLink} hx-target="#content">
              <div>
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
            <div
              class="bg-cover bg-top h-4 md:h-6 lg:h-8 ramp rounded-b-md "
              style={divBackgound}
            />
          </div>
        );
      });
      return html.join(" ");
    },
    {
      body: t.Object({
        page: t.Numeric(),
        offset: t.Numeric(),
      }),
    }
  )
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
