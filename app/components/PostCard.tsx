"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    textColor: string | null;
    stickerUrl: string | null;
}

interface PostCardProps {
    post: Post;
    accentColor: string;
}

export default function PostCard({ post, accentColor }: PostCardProps) {
    const router = useRouter();

    const handleCardClick = (e: React.MouseEvent) => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) return;
        router.push(`/post/${post.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative bg-[#fdf6e3]/80 backdrop-blur-sm brutal-border p-6 brutal-shadow hover:brutal-shadow-hover transition-all duration-150 h-full flex flex-col justify-between cursor-pointer overflow-hidden"
            style={{
                "--border-color": accentColor,
                "--shadow-color": accentColor,
            } as React.CSSProperties}
        >
            {post.stickerUrl && (
                <div className="absolute top-6 right-6 z-10 pointer-events-none transition-transform group-hover:scale-110">
                    <img
                        src={post.stickerUrl}
                        alt="sticker"
                        className="w-20 h-20 object-contain drop-shadow-lg rotate-0 opacity-90"
                        loading="lazy"
                    />
                </div>
            )}
            <div>
                <div className="text-xs font-bold mb-2 uppercase" style={{ color: accentColor }}>
                    {new Date(post.createdAt).toLocaleString()}
                </div>

                <Link href={`/post/${post.id}`} onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-2xl font-black uppercase mb-4 break-words group-hover:underline decoration-4 underline-offset-4 text-[#2b2b2b]">
                        {post.title}
                    </h2>
                </Link>

                <p
                    className="text-sm font-bold text-[#504945] line-clamp-3 mb-6 font-sans"
                    style={{ color: post.textColor || "#2b2b2b" }}
                >
                    {post.body}
                </p>


            </div>

            <div
                className="flex justify-between items-center border-t-2 pt-4 mt-auto"
                style={{ borderColor: accentColor }}
            >
                <span className="font-bold uppercase text-sm" style={{ color: accentColor }}>
                    READ_POST
                </span>
                <span className="text-xl" style={{ color: accentColor }}>
                    →
                </span>
            </div>
        </div >
    );
}
