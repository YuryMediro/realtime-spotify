import { Button } from "@/components/kit/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/kit/sheet";
import { Slider } from "@/components/kit/slider";
import { playerStore } from "@/entities/store/player-store";
import { useDominantColor } from "@/shared/hooks/useDominantColor";
import { formatDuration } from "@/shared/lib/format/formatDuration";
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const MobileSheetFooter = observer(() => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    currentTime,
    duration,
    seek,
    canGoNext,
    canGoPrev,
  } = playerStore;
  const [isHoverTime, setIsHoverTime] = useState(false);
  const dominantColor = useDominantColor(currentSong?.imageUrl);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <footer
          className="sm:hidden h-17 px-4 relative"
          style={{
            backgroundColor: dominantColor,
            backgroundImage: `linear-gradient(135deg, ${dominantColor} 0%, rgba(24, 24, 27, 0.9) 100%)`,
          }}
        >
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
              thumbClassName="w-3 h-3 bg-green-500 border-none"
            />
          </div>

          <div className="flex justify-between items-center h-full mx-auto pt-1">
            <div className="flex items-center gap-4">
              {currentSong && (
                <>
                  <img
                    src={currentSong.imageUrl}
                    alt={currentSong.title}
                    className="w-13 h-13 object-cover rounded-md"
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
                className="bg-green-500 hover:bg-green-600 text-black rounded-full h-10 w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                disabled={!currentSong}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </footer>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-full bg-zinc-900 border-zinc-800 rounded-t-2xl"
      >
        <div
          className="flex flex-col h-full items-center pt-15 px-7"
          style={{
            backgroundColor: dominantColor,
            backgroundImage: `linear-gradient(135deg, ${dominantColor} 0%, rgba(24, 24, 27, 0.9) 100%)`,
          }}
        >
          <SheetTitle className="sr-only">Now Playing:</SheetTitle>
          <SheetDescription className="flex flex-col">
            {currentSong && (
              <>
                <img
                  src={currentSong.imageUrl}
                  alt={currentSong.title}
                  className="w-full object-cover rounded-xl shadow-2xl mb-4"
                />
                <div className="mb-8">
                  <h2 className="font-medium text-lg text-zinc-100 truncate hover:underline cursor-pointer">
                    {currentSong?.title}
                  </h2>
                  <p className="text-base text-zinc-400 truncate hover:underline cursor-pointer">
                    {currentSong?.artist}
                  </p>
                </div>
              </>
            )}

            <div className="mb-6">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={(value) => seek(value[0])}
                className="w-full h-2"
                trackClassName="h-1 bg-zinc-600"
                rangeClassName="bg-green-500"
                thumbClassName="w-4 h-4 bg-green-500 border-none"
              />
              <div className="flex justify-between text-xs text-zinc-400 mt-2 px-1">
                <span>{formatDuration(currentTime)}</span>
                <span>{formatDuration(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mb-8">
              <Button
                size="icon"
                variant="ghost"
                className="hover:text-white text-zinc-400"
              >
                <Shuffle className="h-6 w-6" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="hover:text-white text-zinc-400"
                onClick={playPrev}
                disabled={!canGoPrev}
              >
                <SkipBack className="h-6 w-6" />
              </Button>

              <Button
                size="icon"
                className="bg-green-500 hover:bg-green-600 text-black rounded-full h-14 w-14"
                onClick={togglePlay}
                disabled={!currentSong}
              >
                {isPlaying ? (
                  <Pause className="h-7 w-7" />
                ) : (
                  <Play className="h-7 w-7" />
                )}
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="hover:text-white text-zinc-400"
                onClick={playNext}
                disabled={!canGoNext}
              >
                <SkipForward className="h-6 w-6" />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="hover:text-white text-zinc-400"
              >
                <Repeat className="h-6 w-6" />
              </Button>
            </div>
          </SheetDescription>
        </div>
      </SheetContent>
    </Sheet>
  );
});
