import { playerStore } from "@/entities/store/player-store";
import { useEffect, useRef } from "react";

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      playerStore.setAudio(audioRef.current);
    }
  }, []);
  return <audio ref={audioRef} />;
};
