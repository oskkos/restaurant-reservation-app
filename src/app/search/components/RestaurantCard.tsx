import Link from 'next/link';
import { RestaurantSearch } from '../page';
import Price from '@/app/components/Price';
import { Review } from '@prisma/client';
import { calculateAverageRating } from '@/app/util/reviewHelper';
import Stars from '@/app/components/Stars';

const ratingText = (rating: number) => {
  if (rating > 4) {
    return 'Awesome';
  } else if (rating <= 4 && rating > 3) {
    return 'Good';
  } else if (rating <= 3 && rating > 0) {
    return 'Average';
  } else {
    return '';
  }
};

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: RestaurantSearch;
}) {
  const rating = calculateAverageRating(restaurant.reviews);
  return (
    <div className="border-b flex pb-5 ml-4">
      <img src={restaurant.main_image} alt="" className="w-44 h-36 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">{<Stars rating={rating} />}</div>
          <p className="ml-2 text-sm">{ratingText(rating)}</p>
        </div>
        <div className="mb-9 capitalize">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4">{restaurant.cuisine.name}</p>
            <p className="mr-4">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
