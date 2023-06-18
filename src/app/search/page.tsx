import Header from '@/app/search/components/Header';
import SideBar from '@/app/search/components/SideBar';
import RestaurantCard from '@/app/search/components/RestaurantCard';
import { prisma } from '../util/prisma';
import { Cuisine, Location, PRICE, Restaurant } from '@prisma/client';

export const metadata = {
  title: 'Search restaurants',
};

interface Props {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}
export type RestaurantSearch = Pick<
  Restaurant,
  'id' | 'name' | 'main_image' | 'price' | 'slug'
> & { location: Location; cuisine: Cuisine };
const searchRestaurants = async (searchParams: {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}): Promise<RestaurantSearch[]> => {
  const fields = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  return await prisma.restaurant.findMany({
    where: {
      location: searchParams.city
        ? {
            name: {
              startsWith: searchParams.city,
              mode: 'insensitive',
            },
          }
        : undefined,
      cuisine: searchParams.cuisine
        ? {
            name: {
              equals: searchParams.cuisine,
              mode: 'insensitive',
            },
          }
        : undefined,
      price: searchParams.price ? searchParams.price : undefined,
    },
    select: fields,
  });
};
const fetchCities = async () => {
  return await prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
    distinct: ['name'],
  });
};

const fetchCuisines = async () => {
  return await prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
    distinct: ['name'],
  });
};

export default async function Search({ searchParams }: Props) {
  const restaurants = await searchRestaurants(searchParams);
  const cities = await fetchCities();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header></Header>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideBar
          cities={cities}
          cuisines={cuisines}
          queryParams={searchParams}
        />
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
