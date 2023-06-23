import { Review } from '@prisma/client';

function round(value: number, precision: number = 1) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export const calculateAverageRating = (reviews: Review[]) => {
  if (!reviews.length) {
    return 0;
  }
  return round(
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
  );
};
