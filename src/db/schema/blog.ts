import { text, sqliteTable, integer, index } from "drizzle-orm/sqlite-core";

export const blog = sqliteTable(
  "blog",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    author: text("author").notNull(),
    publicationDate: integer("publication_date", { mode: "timestamp" }),
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
      titleInx: index("title_index").on(table.title),
      authorInx: index("author_index").on(table.author),
    };
  }
);
