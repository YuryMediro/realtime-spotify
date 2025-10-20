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
  const [isHoverVolume, setIsHoverVolume] = useState(false);

  return (
    <footer className="h-20 bg-zinc-900 px-4 relative mx-4 rounded-lg">
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

      <div className="flex justify-center sm:justify-between items-center h-full mx-auto">
        <div className="hidden sm:flex items-center gap-4">
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

        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            className="hidden sm:inline-flex hover:text-white text-zinc-400"
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4 sm:gap-2">
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
              className="bg-green-500 hover:bg-green-600 text-black rounded-full h-10 w-10"
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
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="hidden sm:inline-flex hover:text-white text-zinc-400"
          >
            <Repeat className="h-4 w-4" />
          </Button>
        </div>

        <div className="hidden sm:flex items-center gap-2 relative">
          <div
            className="relative group"
            onMouseEnter={() => setIsHoverVolume(true)}
            onMouseLeave={() => setTimeout(() => setIsHoverVolume(false), 2000)}
          >
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
            >
              <Volume1 className="h-7 w-7" />
            </Button>

            {isHoverVolume && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-zinc-800 rounded-lg p-3 shadow-lg border border-zinc-700"
                onMouseEnter={() => setIsHoverVolume(true)}
                onMouseLeave={() =>
                  setTimeout(() => setIsHoverVolume(false), 2000)
                }
              >
                <Slider
                  className="h-32 hover:cursor-grab active:cursor-grabbing"
                  orientation="vertical"
                  step={1}
                  max={100}
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  trackClassName="w-1 bg-zinc-600"
                  rangeClassName="bg-white"
                  thumbClassName="w-3 h-3 bg-white"
                />
                <div className="text-xs text-white text-center mt-2">
                  {volume}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
});
