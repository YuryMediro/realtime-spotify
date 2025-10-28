import { action, makeAutoObservable, reaction } from "mobx";
import type { ISongs } from "../types/type";
import { chatStore } from "./chat-store";

class PlayerStore {
  currentSong: ISongs | null = null;
  isPlaying: boolean = false;
  queue: ISongs[] = [];
  currentIndex: number = -1;
  volume: number = 75;
  currentTime: number = 0;
  duration: number = 0;
  userId: string | null = null;

  private audio: HTMLAudioElement | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.volume,
      (volume) => {
        if (this.audio) this.audio.volume = volume / 100;
      },
    );

    reaction(
      () => ({
        currentSong: this.currentSong,
        isPlaying: this.isPlaying,
        userId: this.userId,
      }),
      ({ currentSong, isPlaying, userId }) => {
        if (userId && chatStore.socket) {
          let activity = "Idle";
          if (isPlaying && currentSong) {
            activity = `Playing ${currentSong.title} by ${currentSong.artist}`;
          }
          chatStore.updateActivity(userId, activity);
        }
      },
    );
  }

  setUserId = (userId: string) => {
    this.userId = userId;
  };

  setAudio = (audio: HTMLAudioElement) => {
    this.audio = audio;
    this.setUpAudioEvents();
  };

  private setUpAudioEvents = () => {
    if (!this.audio) return;

    this.audio.addEventListener(
      "timeupdate",
      action(() => {
        if (this.audio) {
          this.currentTime = this.audio.currentTime;
        }
      }),
    );

    this.audio.addEventListener(
      "loadedmetadata",
      action(() => {
        if (this.audio) {
          this.duration = this.audio.duration;
        }
      }),
    );

    this.audio.addEventListener("ended", () => {
      this.handleTrackEnd();
    });
  };
  private handleTrackEnd = () => {
    this.playNext();
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
    if (index === -1) return;
    this.currentSong = song;
    this.currentIndex = index;
    this.isPlaying = true;
    this.loadAndPlay();
  };

  togglePlay = () => {
    this.isPlaying = !this.isPlaying;
    if (this.audio) {
      if (this.isPlaying) {
        this.playAudio();
      } else {
        this.audio.pause();
      }
    } else {
      if (this.queue.length > 0) {
        this.setCurrentSong(this.queue[0]);
      }
    }
  };
  private playAudio = async () => {
    if (!this.audio) return;

    try {
      await this.audio.play();
    } catch (error) {
      if (this.isPlaying) {
        this.isPlaying = false;
      }
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
  private loadAndPlay = async () => {
    if (!this.audio || !this.currentSong) return;
    this.audio.pause();
    this.audio.src = this.currentSong.audioUrl;
    if (this.isPlaying) {
      this.playAudio();
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
