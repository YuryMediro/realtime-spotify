export const formatTimeChat = (date: string) => {
  return new Date(date).toLocaleString("ru-RU", {
    timeStyle: "short",
  });
};
