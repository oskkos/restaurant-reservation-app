import RestaurantNavBar from '@/app/restaurant/[slug]/components/RestaurantNavBar';
import Title from './components/Title';
import Rating from './components/Rating';
import Description from './components/Description';
import Images from './components/Images';
import Reviews from './components/Reviews';
import Reservations from './components/Reservations';
import { prisma } from '@/app/util/prisma';

interface Props {
  params: {
    slug: string;
  };
}

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUniqueOrThrow({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    },
  });
  return restaurant;
};

export default async function RestaurantDetails(props: Props) {
  const restaurant = await fetchRestaurantBySlug(props.params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      {/* RESERVATION CARD */}
      <div className="w-[27%] relative text-reg">
        <Reservations></Reservations>
      </div>
    </>
  );
}
