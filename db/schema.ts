import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const post = pgTable("post", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    textColor: text("textColor"),
    stickerUrl: text("stickerUrl"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});