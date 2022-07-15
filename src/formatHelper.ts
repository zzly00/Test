export const formatNumber = (x?: string | number) => {
  if (!x) return '';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPrice = (x?: string | number) => {
  if (!x) return '';
  const numArr = Number(x).toFixed(1).toString().split('.');
  numArr[0] = numArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numArr.join('.');
};