import { calculateAverageRating } from '@/app/util/reviewHelper';
import { Review } from '@prisma/client';

export default function Rating({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>****</p>
        <p className="text-reg ml-3">{calculateAverageRating(reviews)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} reviews</p>
      </div>
    </div>
  );
}
