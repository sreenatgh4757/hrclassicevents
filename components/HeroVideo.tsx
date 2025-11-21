"use client";

import { useEffect, useRef } from 'react';

interface HeroVideoProps {
  videoSrc: string;
  posterSrc: string;
  fallbackSrc: string;
}

export default function HeroVideo({ videoSrc, posterSrc, fallbackSrc }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Video autoplay prevented");
      }
    };

    video.addEventListener('loadeddata', playVideo);

    return () => {
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={posterSrc}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url('${fallbackSrc}')` }}
      />
    </>
  );
}
