export const arrayToMap = <T, K extends string | number>(array: Array<T>, key: keyof T) => {
  return array.reduce(
    (acc, item) => {
      acc[item[key] as K] = item;
      return acc;
    },
    {} as Record<K, T>,
  );
};
