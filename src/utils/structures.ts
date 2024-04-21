export const arrayToMap = <T, K extends string | number>(array: Array<T>, key: keyof T) => {
  return array.reduce(
    (acc, item) => {
      acc[item[key] as K] = item;
      return acc;
    },
    {} as Record<K, T>,
  );
};

export const filterObject = (obj: Record<string, unknown>) => {
  return Object.entries(obj).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {});
};
