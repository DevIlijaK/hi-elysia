import {
  text,
  sqliteTable,
  integer,
  index,
  blob,
} from "drizzle-orm/sqlite-core";

export const blog = sqliteTable(
  "blog",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text("title").notNull().unique(),
    searchTitle: text("search_title").notNull().unique(),
    blogBody: text("content").notNull(),
    author: text("author").notNull(),
    publicationDate: integer("publication_date", { mode: "timestamp" }),
    pathToMainBlogPicture: text("path_to_main_blog_picture").notNull().unique(),
    typeOfMainBlogPicture: text("type_of_main_blog_picture").notNull(),
    //   lastModifiedDate: integer("last_modified_date", { mode: "timestamp" }),
    //   categoryTags:
    //   likes: integer("likes"),
    // featuredImage:
    url: text("url").notNull(),
    //   status: text("status", { enum: ["published", "draft", "archived"] }),
    //   seoMetaData:
    //   wordCount: integer("word_count").notNull(),
    //   readCount: integer("read_count").default(0),
    // relatedPosts:
    // authorBio
  },
  (table) => {
    return {
      titleInx: index("title_index").on(table.searchTitle),
      authorInx: index("author_index").on(table.author),
    };
  }
);

export type InsertBlog = typeof blog.$inferInsert;
export type SelectBlog = typeof blog.$inferSelect;
