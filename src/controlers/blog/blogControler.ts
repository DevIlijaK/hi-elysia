import Elysia, { t } from "elysia";
import { db } from "../../db";
import { blog } from "../../db/schema";
import { InsertBlog } from "../../db/schema/blog";

export const blogController = new Elysia({
  prefix: "/blog",
}).post(
  "/create",
  async ({ body: { title, content, author, url } }) => {
    console.log("Body je: " + title);
    await db.transaction(async (tx) => {
      const newBlog = {
        title,
        content,
        author,
        url,
        publicationDate: new Date(),
      } satisfies InsertBlog;
      await tx.insert(blog).values(newBlog);
    });
  },
  {
    body: t.Object({
      title: t.String(),
      content: t.String(),
      author: t.String(),
      url: t.String(),
    }),
  }
);
