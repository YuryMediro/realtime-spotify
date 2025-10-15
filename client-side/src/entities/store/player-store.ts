import { makeAutoObservable, reaction } from "mobx";
import type { ISongs } from "../types/type";

class PlayerStore {
  currentSong: ISongs | null = null;
  isPlaying: boolean = false;
  queue: ISongs[] = [];
  currentIndex: number = -1;
  volume: number = 75;
  currentTime: number = 0;
  duration: number = 0;

  private audio: HTMLAudioElement | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.volume,
      (volume) => {
        if (this.audio) this.audio.volume = volume / 100;
      },
    );
  }

  setAudio = (audio: HTMLAudioElement) => {
    this.audio = audio;
    this.setUpAudioEvents();
  };

  private setUpAudioEvents = () => {
    if (!this.audio) return;

    this.audio.addEventListener("timeupdate", () => {
      this.currentTime = this.audio!.currentTime;
    });

    this.audio.addEventListener("loadedmetadata", () => {
      this.duration = this.audio!.duration;
    });

    this.audio.addEventListener("ended", () => {
      this.playNext();
    });
  };

  initializeQueue = (songs: ISongs[]) => {
    this.queue = songs;
    if (this.currentIndex === -1 && songs.length > 0) {
      this.currentSong = songs[0];
      this.currentIndex = 0;
    }
  };

  playAlbum = (songs: ISongs[], startIndex = 0) => {
    if (songs.length === 0) return;
    this.queue = songs;
    this.currentSong = songs[startIndex];
    this.currentIndex = startIndex;
    this.isPlaying = true;
    this.loadAndPlay();
  };

  setCurrentSong = (song: ISongs) => {
    const index = this.queue.findIndex((s) => s._id === song._id);
    this.currentSong = song;
    this.currentIndex = index;
    this.isPlaying = true;
    this.loadAndPlay();
  };

  togglePlay = () => {
    this.isPlaying = !this.isPlaying;
    if (this.audio) {
      this.isPlaying ? this.audio.play() : this.audio.pause();
    }
  };

  playNext = () => {
    const nextIndex = this.currentIndex + 1;
    if (nextIndex < this.queue.length) {
      this.currentSong = this.queue[nextIndex];
      this.currentIndex = nextIndex;
      this.isPlaying = true;
      this.loadAndPlay();
    } else {
      this.isPlaying = false;
    }
  };

  playPrev = () => {
    const prevIndex = this.currentIndex - 1;
    if (prevIndex >= 0) {
      this.currentSong = this.queue[prevIndex];
      this.currentIndex = prevIndex;
      this.isPlaying = true;
      this.loadAndPlay();
    } else {
      this.isPlaying = false;
    }
  };
  private loadAndPlay = () => {
    if (this.audio && this.currentSong) {
      this.audio.src = this.currentSong.audioUrl;
      if (this.isPlaying) this.audio.play();
    }
  };

  seek = (time: number) => {
    if (this.audio) this.audio.currentTime = time;
  };

  setVolume = (volume: number) => {
    this.volume = Math.min(100, Math.max(0, volume));
  };
  get canGoNext() {
    return this.currentIndex < this.queue.length - 1;
  }

  get canGoPrev() {
    return this.currentIndex > 0;
  }
}

export const playerStore = new PlayerStore();
