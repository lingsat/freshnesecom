export const getStarsArrFromNumber = (num: number) => {
  const arr = Array(5).fill(false);
  return arr.map((_, index) => index < num);
};
