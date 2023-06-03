import Header from '@/app/search/components/Header';
import SideBar from '@/app/search/components/SideBar';
import RestaurantCard from '@/app/search/components/RestaurantCard';
import { prisma } from '../util/prisma';
import { Cuisine, Location, Restaurant } from '@prisma/client';

export const metadata = {
  title: 'Search restaurants',
};

interface Props {
  searchParams: { city: string };
}
export type RestaurantSearch = Pick<
  Restaurant,
  'id' | 'name' | 'main_image' | 'price' | 'slug'
> & { location: Location; cuisine: Cuisine };
const searchRestaurants = async (
  search: string,
): Promise<RestaurantSearch[]> => {
  const fields = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  if (!search) {
    return await prisma.restaurant.findMany({ select: fields });
  }
  return await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          startsWith: search,
          mode: 'insensitive',
        },
      },
    },
    select: fields,
  });
};

export default async function Search({ searchParams }: Props) {
  const restaurants = await searchRestaurants(searchParams.city);

  return (
    <>
      <Header></Header>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideBar></SideBar>
        <div className="w-5/6">
          {restaurants.length === 0 ? 'Sorry, nothing found' : ''}
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </div>
    </>
  );
}
