import type { VerifiedReview } from '../types';

export const VERIFIED_REVIEWS: VerifiedReview[] = [];

export const getVerifiedReviews = (): VerifiedReview[] => {
  return VERIFIED_REVIEWS.filter(r => r.isVerified);
};
