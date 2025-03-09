export const calculateReviewStats = (reviews) => {
  const totalReviews = reviews.length;
  const totalRating = reviews.reduce(
    (sum, review) => sum + review.reviewRating,
    0
  );
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter(
      (review) => review.reviewRating === rating
    ).length;
    return {
      label: rating.toString(),
      percent: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
      numberOf: count,
    };
  });

  return { averageRating, totalReviews, ratingCounts };
};
