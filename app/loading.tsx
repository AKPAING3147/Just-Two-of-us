export default function Loading() {
    return (
        <div className="min-h-screen bg-[#fdf6e3] flex flex-col items-center justify-center p-8 font-mono">
            <div className="relative">
                {/* Main Retro Loader Container */}
                <div className="w-32 h-32 brutal-border bg-white flex items-center justify-center brutal-shadow relative animate-[sticker-float_2s_ease-in-out_infinite]">
                    <div className="text-5xl animate-pulse">📡</div>

                    {/* Corner accents */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-black"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#fb4934]"></div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-[0.3em] text-[#2b2b2b] mb-4">
                    ESTABLISHING_LINK
                </h2>

                {/* Micro-loading bar */}
                <div className="w-64 h-6 brutal-border bg-[#2b2b2b] p-1 mx-auto overflow-hidden">
                    <div className="h-full bg-[#fabd2f] animate-[loading-bar_1.5s_linear_infinite]" style={{ width: '40%' }}></div>
                </div>

                <p className="mt-6 font-bold text-[#928374] uppercase text-xs tracking-widest animate-pulse">
                    SYNCHRONIZING_DATABASE_FEED...
                </p>
            </div>

        </div>
    );
}
