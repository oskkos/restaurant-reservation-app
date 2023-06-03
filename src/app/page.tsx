import Header from '@/app/components/Header';
import RestaurantCard from './components/RestaurantCard';
import { Cuisine, Location, PRICE, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface RestaurantCardData {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
}

const fetchRestaurants = async (): Promise<RestaurantCardData[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  console.log(restaurants);
  return (
    <main>
      <Header></Header>
      <div className="py-3 px-36 mt-10 flex flex-wrap">
        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </main>
  );
}
