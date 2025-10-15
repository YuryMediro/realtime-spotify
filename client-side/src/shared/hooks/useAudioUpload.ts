import { useRef, useState, type ChangeEvent } from "react";

export const useAudioUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(0);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
    }
  };

  const removeAudio = () => {
    setSelectedFile(null);
    setDuration(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    selectedFile,
    duration,
    handleButtonClick,
    removeAudio,
    handleFileSelect,
  };
};
