export const getSlicedDateByMonth = (original?: string) => {
  return original?.split('-')[0] + '-' + original?.split('-')[1];
};
