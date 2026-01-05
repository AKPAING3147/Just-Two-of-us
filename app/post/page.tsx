"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/db/action";
import { toast } from "sonner";



export default function CreatePostPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [textColor, setTextColor] = useState("#000000");
    const [imageUrl, setImageUrl] = useState("");
    const [stickerUrl, setStickerUrl] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default"); // Using the same preset as requested

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) throw new Error("Upload failed");

            const data = await response.json();
            setImageUrl(data.secure_url);
            toast.success("IMAGE_READY");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("UPLOAD_FAILED");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        setIsSubmitting(true);
        try {
            await createPost(title, body, textColor, imageUrl, stickerUrl);
            toast.success("ENTRY PUBLISHED SUCCESSFULLY");
            router.push("/");
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("FAILED TO PUBLISH ENTRY");
        } finally {
            setIsSubmitting(false);
        }
    };





    return (
        <div className="min-h-screen p-4 md:p-8 font-mono flex items-center justify-center relative">
            {/* Full Screen Loading Stage */}
            {isSubmitting && (
                <div className="fixed inset-0 z-100 bg-[#fdf6e3] flex flex-col items-center justify-center p-8 text-center bg-opacity-95 backdrop-blur-sm">
                    <div className="w-24 h-24 brutal-border bg-[#fabd2f] animate-bounce mb-8 flex items-center justify-center brutal-shadow">
                        <span className="text-4xl">📝</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-[#2b2b2b] mb-4">
                        PUBLISHING_ENTRY...
                    </h2>
                    <p className="font-bold text-[#928374] animate-pulse">
                        SAYING_HELLO_TO_THE_DATABASE
                    </p>
                </div>
            )}

            <div className="w-full max-w-2xl">
                <div className="mb-8 flex items-center justify-between">
                    <button
                        onClick={() => router.push("/")}
                        className="px-4 py-2 bg-[#fdf6e3] brutal-border font-bold uppercase hover:bg-[#2b2b2b] hover:text-[#fdf6e3] transition-colors text-[#2b2b2b]"
                    >
                        ← BACK
                    </button>
                    <h1 className="text-3xl font-black uppercase bg-[#fdf6e3] px-4 py-1 brutal-border brutal-shadow text-[#2b2b2b]">
                        NEW_ENTRY
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#fdf6e3] brutal-border p-8 brutal-shadow relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#2b2b2b]"></div>

                    <div className="mb-8">
                        <label
                            htmlFor="title"
                            className="block text-sm font-black uppercase mb-2"
                        >
                            TITLE_INPUT
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



                    <div className="mb-8 font-mono">
                        <label className="block text-sm font-black uppercase mb-2">
                            UPLOAD_IMAGE (FROM_FILES)
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full px-4 py-4 bg-[#fdf6e3] brutal-border font-bold focus:outline-none text-[#2b2b2b] cursor-pointer file:mr-4 file:py-2 file:px-4 file:brutal-border file:text-sm file:font-black file:bg-[#fabd2f] file:text-[#2b2b2b] hover:file:bg-[#fe8019]"
                                disabled={isSubmitting || isUploading}
                            />
                            {isUploading && (
                                <p className="mt-2 text-xs font-bold animate-pulse text-[#fe8019]">UPLOADING_TO_CLOUD...</p>
                            )}
                        </div>

                        {imageUrl && (
                            <div className="mt-4 brutal-border p-2 bg-white brutal-shadow">
                                <img src={imageUrl} alt="Upload Preview" className="w-full h-auto max-h-60 object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setImageUrl("")}
                                    className="mt-2 text-[10px] font-bold text-red-600 uppercase hover:underline"
                                >
                                    [ REMOVE_IMAGE ]
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mb-8">
                        <label
                            htmlFor="stickerUrl"
                            className="block text-sm font-black uppercase mb-2"
                        >
                            STICKER_LINK (GIF/PNG/JPG)
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
                            CONTENT_Body
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
                            className="flex-1 px-8 py-4 bg-[#2b2b2b] text-[#fdf6e3] brutal-border font-black uppercase tracking-widest hover:bg-[#fdf6e3] hover:text-[#2b2b2b] transition-all disabled:opacity-50 disabled:cursor-not-allowed brutal-shadow hover:brutal-shadow-hover active:brutal-shadow-active"
                        >
                            {isSubmitting ? "UPLOADING..." : "PUBLISH_NOW"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}