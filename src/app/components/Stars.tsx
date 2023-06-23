import fullStar from '#/icons/full-star.png';
import halfStar from '#/icons/half-star.png';
import emptyStar from '#/icons/empty-star.png';
import Image from 'next/image';

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const diff = parseFloat((rating - i).toFixed(1));
    if (diff >= 0.7) {
      stars.push(fullStar);
    } else if (diff > 0.2) {
      stars.push(halfStar);
    } else {
      stars.push(emptyStar);
    }
  }
  return stars;
};

export default function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center" title={rating.toString()}>
      {renderStars(rating).map((star, i) => (
        <Image src={star} key={i} alt="" className="w-4 h-4 mr-1" />
      ))}
    </div>
  );
}
