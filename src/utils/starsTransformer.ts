export const getStarsArrFromNumber = (num: number) => {
  const arr = Array(5).fill(false);
  return arr.map((i_, index) => index < num);
};
