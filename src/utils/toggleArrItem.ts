export const getToggledArray = <T>(arr: T[], item: T): T[] => {
  return arr.includes(item)
    ? arr.filter((arrItem) => arrItem !== item)
    : [item, ...arr];
};
