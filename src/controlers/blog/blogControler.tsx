import Elysia, { t } from "elysia";
import { blog } from "../../db/schema";
import { InsertBlog } from "../../db/schema/blog";
import { ctx } from "../../context/context";
import { html } from "@elysiajs/html";

export const blogController = new Elysia({
  prefix: "/blog",
})
  .use(ctx)
  .use(html())
  .post(
    "/create",
    async ({ body: { title, content }, session, db }) => {
      console.log("Body je: " + session);

      await db.transaction(async (tx) => {
        const newBlog = {
          title,
          content,
          author: "ilija",
          url: "ilija",
          publicationDate: new Date(),
        } satisfies InsertBlog;
        await tx.insert(blog).values(newBlog);
      });
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
        // author: t.String(),
        // url: t.String(),
      }),
    }
  )
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
            <h2 class="text-xl font-semibold">{blogPost.title}</h2>
            <p class="text-gray-500">Posted on October 31, 2023</p>
            <p class="mt-4">{blogPost.content}</p>
          </div>
        </div>
      );
    });
    return html.join(" ");
  });
