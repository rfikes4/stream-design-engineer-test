export const getFormattedTime = () => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedHours = (hours % 12 || 12).toString();
  return `${formattedHours}:${minutes}`;
};
