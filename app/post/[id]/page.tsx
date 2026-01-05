import { notFound } from "next/navigation";
import { getPostById } from "@/db/action";
import Link from "next/link";
import DeleteButton from "./DeleteButton";


export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
        notFound();
    }

    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen p-4 md:p-12 font-mono">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-block px-4 py-2 mb-8 bg-[#fdf6e3] brutal-border font-bold uppercase hover:bg-[#2b2b2b] hover:text-[#fdf6e3] transition-colors text-[#2b2b2b]"
                >
                    ← BACK_HOME
                </Link>

                <article className="bg-[#fdf6e3] brutal-border p-4 md:p-12 brutal-shadow relative overflow-hidden">
                    {post.stickerUrl && (
                        <div className="absolute top-12 right-12 z-20 pointer-events-none transition-transform hover:scale-110">
                            <img
                                src={post.stickerUrl}
                                alt="sticker"
                                className="w-24 h-24 md:w-40 md:h-40 object-contain drop-shadow-2xl opacity-90 rotate-0"
                                loading="lazy"
                            />
                        </div>
                    )}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#2b2b2b]"></div>

                    <div className="border-b-4 border-[#2b2b2b] pb-6 mb-8 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-bold text-xs uppercase text-[#928374]">
                                {new Date(post.createdAt).toLocaleString()}
                            </span>
                            <span className="font-bold text-xs uppercase text-[#928374]">
                                READ_MODE
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight break-words text-[#2b2b2b]">
                            {post.title}
                        </h1>
                    </div>



                    <div className="prose prose-slate max-w-none font-sans prose-lg relative z-10">
                        <p
                            className="text-xl font-medium leading-relaxed whitespace-pre-wrap border-l-4 border-[#d5c4a1] pl-6"
                            style={{ color: post.textColor || '#2b2b2b' }}
                        >
                            {post.body}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-12 pt-8 border-t-4 border-[#2b2b2b] bg-[#fdf6e3] relative z-10 -mx-4 -mb-4 p-4 md:-mx-12 md:-mb-12 md:p-8">
                        <Link
                            href={`/post/${post.id}/edit`}
                            className="bg-[#fdf6e3] text-[#2b2b2b] brutal-border px-6 py-3 font-bold uppercase brutal-shadow hover:brutal-shadow-hover active:brutal-shadow-active transition-all w-full md:w-auto text-center"
                        >
                            [ EDIT_DATA ]
                        </Link>
                        <DeleteButton postId={post.id} />
                    </div>
                </article>
            </div>
        </div>
    );
}