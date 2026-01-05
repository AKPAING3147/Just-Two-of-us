"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPostById, updatePost } from "@/db/action";
import { toast } from "sonner";



export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const idParam = params?.id;
    const postId = parseInt(Array.isArray(idParam) ? idParam[0] : (idParam || "0"));

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [textColor, setTextColor] = useState("#000000");
    const [stickerUrl, setStickerUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            if (isNaN(postId) || postId === 0) {
                return;
            }

            try {
                const post = await getPostById(postId);
                if (post) {
                    setTitle(post.title);
                    setBody(post.body);
                    setTextColor(post.textColor || "#000000");
                    setStickerUrl(post.stickerUrl || "");
                } else {
                    router.push('/');
                }
            } catch (e) { console.error(e); } finally { setIsLoading(false); }
        };

        if (postId) fetchPost();
    }, [postId, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        setIsSubmitting(true);
        try {
            await updatePost(postId, title, body, textColor, stickerUrl);
            toast.success("ENTRY UPDATED SUCCESSFULLY");
            router.push(`/post/${postId}`);
        } catch (error) {
            console.error("Error updating post:", error);
            toast.error("FAILED TO UPDATE ENTRY");
        } finally {
            setIsSubmitting(false);
        }
    };







    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fdf6e3] flex items-center justify-center font-mono">
                <div className="text-2xl font-black uppercase tracking-widest animate-pulse brutal-border p-4 bg-[#fabd2f] brutal-shadow text-[#2b2b2b]">
                    LOADING_DATA...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8 font-mono flex items-center justify-center relative">
            {/* Full Screen Loading Stage */}
            {isSubmitting && (
                <div className="fixed inset-0 z-100 bg-[#fdf6e3] flex flex-col items-center justify-center p-8 text-center bg-opacity-95 backdrop-blur-sm">
                    <div className="w-24 h-24 brutal-border bg-[#fabd2f] animate-bounce mb-8 flex items-center justify-center brutal-shadow">
                        <span className="text-4xl">💾</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-[#2b2b2b] mb-4">
                        SAVING_CHANGES...
                    </h2>
                    <p className="font-bold text-[#928374] animate-pulse">
                        REWRITING_HISTORY
                    </p>
                </div>
            )}

            <div className="w-full max-w-2xl">
                <div className="mb-8 flex items-center justify-between">
                    <button
                        onClick={() => router.push(`/post/${postId}`)}
                        className="px-4 py-2 bg-[#fdf6e3] brutal-border font-bold uppercase hover:bg-[#2b2b2b] hover:text-[#fdf6e3] transition-colors text-[#2b2b2b]"
                    >
                        ← CANCEL
                    </button>
                    <h1 className="text-3xl font-black uppercase bg-[#fdf6e3] px-4 py-1 brutal-border brutal-shadow text-[#2b2b2b]">
                        EDIT_ENTRY
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#fdf6e3] brutal-border p-8 brutal-shadow relative">
                    <div className="absolute top-0 right-0 w-full h-2 bg-[#2b2b2b]"></div>

                    <div className="mb-8">
                        <label
                            htmlFor="title"
                            className="block text-sm font-black uppercase mb-2"
                        >
                            TITLE_edit
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ color: textColor }}
                            placeholder="ENTER TITLE..."
                            className="w-full px-4 py-4 bg-[#fdf6e3] brutal-border font-bold focus:outline-none focus:bg-[#fbf1c7] focus:brutal-shadow transition-all text-[#2b2b2b]"
                            required
                            disabled={isSubmitting}
                        />
                    </div>



                    <div className="mb-8">
                        <label
                            htmlFor="stickerUrl"
                            className="block text-sm font-black uppercase mb-2"
                        >
                            STICKER_LINK_edit (GIF/PNG/JPG)
                        </label>
                        <input
                            type="url"
                            id="stickerUrl"
                            value={stickerUrl}
                            onChange={(e) => setStickerUrl(e.target.value)}
                            placeholder="HTTPS://EXAMPLE.COM/STICKER.GIF..."
                            className="w-full px-4 py-4 bg-[#fdf6e3] brutal-border font-bold focus:outline-none focus:bg-[#fbf1c7] focus:brutal-shadow transition-all text-[#2b2b2b]"
                            disabled={isSubmitting}
                        />
                        {stickerUrl && (
                            <div className="mt-4 brutal-border p-2 bg-black/5 inline-block">
                                <img src={stickerUrl} alt="Sticker Preview" className="h-20 w-auto" />
                            </div>
                        )}
                    </div>

                    <div className="mb-8">
                        <label
                            htmlFor="body"
                            className="block text-sm font-black uppercase mb-2"
                        >
                            CONTENT_edit
                        </label>
                        <div className="relative">
                            <textarea
                                id="body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                style={{ color: textColor }}
                                placeholder="WRITE SOMETHING..."
                                rows={8}
                                className="w-full px-4 py-4 bg-[#fdf6e3] brutal-border font-bold focus:outline-none focus:bg-[#fbf1c7] focus:brutal-shadow transition-all resize-none text-[#2b2b2b]"
                                required
                                disabled={isSubmitting}
                            />

                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <div className="relative group">
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="h-10 w-10 brutal-border p-1 cursor-pointer bg-[#fdf6e3]"
                                        title="Text Color"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !title.trim() || !body.trim()}
                            className="flex-1 px-8 py-4 bg-[#fabd2f] text-[#2b2b2b] brutal-border font-black uppercase tracking-widest hover:bg-[#fe8019] transition-all disabled:opacity-50 disabled:cursor-not-allowed brutal-shadow hover:brutal-shadow-hover active:brutal-shadow-active"
                        >
                            {isSubmitting ? "SAVING..." : "SAVE_CHANGES"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
