import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const post = pgTable("post", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    textColor: text("textColor"),
    imageUrl: text("imageUrl"),
    stickerUrl: text("stickerUrl"),
    musicUrl: text("musicUrl"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});