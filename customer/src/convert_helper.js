export const formatMoney = (value) => {
  let data = value === undefined ? "" : value.toString().replace(/,/g, "");
  return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
