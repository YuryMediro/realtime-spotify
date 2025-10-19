import { Button } from "@/components/kit/button";
import { playerStore } from "@/entities/store/player-store";
import { formatDuration } from "@/shared/lib/format/formatDuration";
import { Slider } from "@/components/kit/slider";
import {
  Shuffle,
  SkipBack,
  Pause,
  Play,
  SkipForward,
  Repeat,
  Volume1,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const AudioFooter = observer(() => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    currentTime,
    duration,
    volume,
    seek,
    setVolume,
    canGoNext,
    canGoPrev,
  } = playerStore;

  const [isHoverTime, setIsHoverTime] = useState(false);

  return (
    <footer className="h-20 bg-zinc-900 px-4 relative">
      <div className="absolute -top-13 left-0 right-0 flex justify-between text-md text-zinc-400 px-2">
        {isHoverTime && (
          <>
            <span className="text-white border border-zinc-600 rounded-md px-3 py-2 bg-zinc-900">
              {formatDuration(currentTime)}
            </span>
            <span className="text-white border border-zinc-600 rounded-md px-3 py-2 bg-zinc-900">
              {formatDuration(duration)}
            </span>
          </>
        )}
      </div>

      <div
        className="absolute left-0 right-0 h-1"
        onMouseEnter={() => setIsHoverTime(true)}
        onMouseLeave={() => setIsHoverTime(false)}
      >
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={(value) => seek(value[0])}
          className="w-full h-full hover:cursor-grab active:cursor-grabbing"
          trackClassName="h-1 bg-zinc-600"
          rangeClassName="bg-green-500"
          thumbClassName="w-3 h-3 bg-green-500"
        />
      </div>

      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={playPrev}
              disabled={!canGoPrev}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={playNext}
              disabled={!canGoNext}
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
            >
              <Volume1 className="h-4 w-4" />
            </Button>

            <Slider
              className="w-24 hover:cursor-grab active:cursor-grabbing"
              step={1}
              max={100}
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
            />
          </div>
        </div>
      </div>
    </footer>
  );
});
