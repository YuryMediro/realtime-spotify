import { useState, useEffect, useRef } from "react";

export const useDominantColor = (imageUrl: string | undefined) => {
  const [dominantColor, setDominantColor] = useState("rgba(24, 24, 27, 0.4)");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!imageUrl) {
      setDominantColor("rgba(24, 24, 27, 0.4)");
      return;
    }

    const extractDominantColor = (url: string) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;

      img.onload = () => {
        const canvas = canvasRef.current || document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Получаем данные пикселей
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Упрощенный алгоритм для нахождения доминирующего цвета
        let r = 0,
          g = 0,
          b = 0,
          count = 0;

        // Анализируем каждый 10-й пиксель для производительности
        for (let i = 0; i < data.length; i += 40) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }

        // Вычисляем средние значения
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        // Создаем цвет с прозрачностью для лучшего визуального эффекта
        setDominantColor(`rgba(${r}, ${g}, ${b}, 0.4)`);
      };

      img.onerror = () => {
        // В случае ошибки загрузки изображения используем цвет по умолчанию
        setDominantColor("rgba(24, 24, 27, 0.4)");
      };
    };

    extractDominantColor(imageUrl);
  }, [imageUrl]);

  return dominantColor;
};
