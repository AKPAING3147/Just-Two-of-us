"use server";

import { db } from ".";
import { post } from "./schema";
import { eq, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const readPost = async (limit: number = 20) => {
    const posts = await db.select({
        id: post.id,
        title: post.title,
        body: post.body,
        audioUrl: post.audioUrl,
        stickerUrl: post.stickerUrl,
        createdAt: post.createdAt,
        textColor: post.textColor,
    }).from(post).orderBy(desc(post.createdAt)).limit(limit);

    return posts;
};

export const getPostById = async (id: number) => {
    const result = await db.query.post.findFirst({
        where: eq(post.id, id)
    });
    return result;
};

export const createPost = async (title: string, body: string, textColor: string = "#000000", audioUrl?: string, stickerUrl?: string) => {
    try {
        const newPost = await db.insert(post).values({ title, body, textColor, audioUrl, stickerUrl }).returning();
        revalidatePath("/");
        return newPost[0];
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
    }
};

export const updatePost = async (id: number, title: string, body: string, textColor: string = "#000000", audioUrl?: string, stickerUrl?: string) => {
    try {
        const updatedPost = await db.update(post)
            .set({ title, body, textColor, audioUrl, stickerUrl })
            .where(eq(post.id, id))
            .returning();
        revalidatePath("/");
        revalidatePath(`/post/${id}`);
        return updatedPost[0];
    } catch (error) {
        console.error("Error updating post:", error);
        throw new Error("Failed to update post");
    };
};

export const deletePost = async (id: number) => {
    try {
        const deletedPost = await db.delete(post).where(eq(post.id, id)).returning();
        revalidatePath("/");
        return deletedPost[0];
    } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Failed to delete post");
    }
};