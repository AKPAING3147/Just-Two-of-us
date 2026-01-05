"use client";

import { useState, useRef, useEffect } from "react";

interface RetroAudioPlayerProps {
    src: string;
    accentColor?: string;
}

export default function RetroAudioPlayer({ src, accentColor = "#fb4934" }: RetroAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const time = parseFloat(e.target.value);
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="brutal-border bg-[#fdf6e3] p-3 flex items-center gap-4 brutal-shadow-sm transition-all hover:translate-x-px hover:translate-y-px hover:shadow-none">
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onWaiting={onWaiting}
                onCanPlay={onCanPlay}
                onEnded={() => setIsPlaying(false)}
            />

            <button
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center brutal-border bg-white hover:bg-[#fabd2f] active:translate-x-[2px] active:translate-y-[2px] transition-all"
                title={isPlaying ? "PAUSE" : "PLAY"}
                disabled={isLoading && !isPlaying}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                    <div className="flex gap-1">
                        <div className="w-1.5 h-4 bg-black"></div>
                        <div className="w-1.5 h-4 bg-black"></div>
                    </div>
                ) : (
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-black border-b-8 border-b-transparent ml-1"></div>
                )}
            </button>

            <div className="flex-1 flex flex-col gap-1">
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="w-full h-4 bg-[#2b2b2b] brutal-border appearance-none cursor-pointer accent-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:brutal-border"
                />
                <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                    <span>{formatTime(currentTime)}</span>
                    <span className="opacity-50 tracking-widest text-xs">AUDIO_STREAM</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
}
