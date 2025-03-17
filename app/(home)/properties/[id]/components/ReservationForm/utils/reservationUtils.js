import { differenceInCalendarDays } from "date-fns";

export const calculateTotalDays = (from, to) => {
  const totalDays = differenceInCalendarDays(to, from);
  return totalDays;
};

export const calculateTotalPrice = (from, to, prices) => {
  let totalPrice = 0;
  const dateFrom = new Date(from);
  const dateTo = new Date(to);

  prices.forEach(({ from: priceFromStr, to: priceToStr, price }) => {
    const priceFrom = new Date(priceFromStr);
    const priceTo = new Date(priceToStr);

    if (dateFrom <= priceTo && dateTo >= priceFrom) {
      const effectiveFrom = dateFrom >= priceFrom ? dateFrom : priceFrom;
      const effectiveTo = dateTo <= priceTo ? dateTo : priceTo;
      const days = calculateTotalDays(effectiveFrom, effectiveTo);
      totalPrice += days * price;
    }
  });

  return totalPrice;
};
