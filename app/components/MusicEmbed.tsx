import React from 'react';

interface MusicEmbedProps {
    url: string;
}

export const MusicEmbed: React.FC<MusicEmbedProps> = ({ url }) => {
    if (!url) return null;

    let embedContent = null;

    if (url.includes('spotify.com')) {
        // Handle Spotify Link
        // Need to extract ID or use oEmbed, but for now assuming standard open.spotify.com/track/ or playlist/
        // Easiest is to replace 'open.spotify.com' with 'open.spotify.com/embed' logic if needed, 
        // but spotify usually provides a share link.
        // If user provides "https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC", embed src is "https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC"
        const embedUrl = url.replace('open.spotify.com', 'open.spotify.com/embed');
        embedContent = (
            <iframe
                style={{ borderRadius: '0px' }}
                src={embedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="brutal-border brutal-shadow"
            />
        );
    } else if (url.includes('soundcloud.com')) {
        // SoundCloud needs an iframe src from their API or oEmbed, but usually users can copy "Embed" code.
        // Since we are taking a direct URL (e.g. https://soundcloud.com/artist/song), we might need a generic player or just an iframe if it supports it.
        // Standard SoundCloud embed requires an iframe src with "w.soundcloud.com/player".
        // It's tricky to convert a direct link to an embed link without an API call for SC.
        // However, many users copy the 'Share' URL which is just the link.
        // PRO TIP: You can use a visual player if you can't get the track ID easily, but let's try a simple widget approach if possible.
        // For now, let's ask users for the "Embed URL" or try a simple iframe to the sharing URL (which might not work due to X-Frame-Options).
        // Let's assume standard SoundCloud Widget URL pattern if reasonable, otherwise maybe just a link.
        // actually, Soundcloud requires fetching the track ID to embed. 
        // ALTERNATIVE: Just wrap it in a player component? 
        // Let's try to pass it to the widget api:
        const encodedUrl = encodeURIComponent(url);
        embedContent = (
            <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23fabd2f&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                className="brutal-border brutal-shadow"
            />
        );
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
        // Handle YouTube
        let videoId = '';
        if (url.includes('youtu.be')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        }

        if (videoId) {
            embedContent = (
                <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="brutal-border brutal-shadow"
                />
            );
        }
    }

    if (!embedContent) {
        return (
            <div className="p-4 brutal-border bg-[#fdf6e3] text-[#2b2b2b] text-xs font-mono">
                <p className="font-bold">LINK_DETECTED:</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="underline truncate block hover:text-[#fabd2f]">
                    {url}
                </a>
            </div>
        );
    }

    return (
        <div className="my-4">
            {embedContent}
        </div>
    );
};
