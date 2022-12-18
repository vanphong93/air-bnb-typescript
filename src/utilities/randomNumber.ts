export const randomNumber = (max: number, min: number | null) => {
  if (min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  return Math.floor(Math.random() * max);
};
