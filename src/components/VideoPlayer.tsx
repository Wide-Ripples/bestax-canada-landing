"use client";

import { useRef, useState, useEffect } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(false);

  // Only load + play the video once it scrolls into view (saves 48MB on initial load)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading 200px before entering viewport
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [visible]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden shadow-xl cursor-pointer bg-[#1a1a1a]"
      style={{ aspectRatio: "16/9" }}
      onClick={toggleMute}
    >
      {visible && (
        <video
          ref={videoRef}
          src="/assets/Video Canada.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover block"
        />
      )}

      {/* Placeholder shown before video loads */}
      {!visible && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-white/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {visible && muted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
          <div className="bg-black/55 rounded-xl px-5 py-3 text-white text-center">
            <p className="text-sm font-semibold mb-1">Your video has already started</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Click to listen
            </div>
          </div>
        </div>
      )}

      {visible && !muted && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 pointer-events-none">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
          Sound on
        </div>
      )}
    </div>
  );
}
