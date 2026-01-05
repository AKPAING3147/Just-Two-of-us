import { readPost } from "@/db/action";
import Link from "next/link";
import BetaAlert from "./BetaAlert";
import PostCard from "@/app/components/PostCard";


const COLORS = ['#fb4934', '#b8bb26', '#fabd2f', '#83a598', '#d3869b', '#8ec07c', '#fe8019'];

export default async function Home() {
  const posts = await readPost();

  return (
    <div className="min-h-screen p-4 md:p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-20 text-center space-y-6">
          <div className="inline-block brutal-border p-4 bg-[#fdf6e3] brutal-shadow">
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-[#2b2b2b]">
              Just_Two
            </h1>
          </div>


          <div className="mt-12">
            <Link
              href="/post"
              className="inline-block px-6 md:px-12 py-4 bg-[#fdf6e3] brutal-border text-lg md:text-xl font-bold uppercase tracking-wider brutal-shadow hover:brutal-shadow-hover transition-all duration-150 text-[#2b2b2b]"
            >
              [ CREATE_NEW_POST ]
            </Link>
          </div>

          <BetaAlert />
        </header>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => {
              const accentColor = COLORS[index % COLORS.length];

              return (
                <PostCard
                  key={post.id}
                  post={post}
                  accentColor={accentColor}
                />
              )
            })
          ) : (
            <div className="col-span-full text-center py-20 border-4 border-dashed border-gray-400 bg-white/50">
              <h3 className="text-3xl font-black uppercase text-gray-400 mb-4">
                NO_DATA_FOUND
              </h3>
              <p className="font-bold text-gray-500 mb-8">
                The database is currently empty.
              </p>
              <Link
                href="/post"
                className="px-8 py-3 bg-black text-white text-lg font-bold uppercase hover:bg-gray-800 transition-colors"
              >
                START_WRITING
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center py-8 font-bold uppercase text-xs tracking-widest border-t-4 border-[#2b2b2b] text-[#2b2b2b]">
          MADE_WITH_LOVE_BY_AKPAING

        </footer>
      </div>
    </div>
  );
}
