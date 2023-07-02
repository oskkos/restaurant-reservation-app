import Stars from '@/app/components/Stars';
import { calculateAverageRating } from '@/app/util/reviewHelper';
import { Review } from '@prisma/client';

export default function Rating({ reviews }: { reviews: Review[] }) {
  const rating = calculateAverageRating(reviews);
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        {<Stars rating={rating} />}
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} reviews</p>
      </div>
    </div>
  );
}
