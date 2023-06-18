'use client';
import { PRICE } from '@prisma/client';
import Link from 'next/link';

export default function SideBar({
  cities,
  cuisines,
  queryParams,
}: {
  cities: Array<{
    id: number;
    name: string;
  }>;
  cuisines: Array<{
    id: number;
    name: string;
  }>;
  queryParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const prices = [
    { price: PRICE.CHEAP, label: '$', cls: 'rounded-l' },
    { price: PRICE.REGULAR, label: '$$', cls: '' },
    { price: PRICE.EXPENSIVE, label: '$$$', cls: 'rounded-r' },
  ];

  return (
    <div className="w-1/5 capitalize">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {cities.map((city) => (
          <Link
            className={`${
              queryParams.city === city.name ? 'font-bold' : 'font-light'
            } text-reg`}
            key={city.id}
            href={{
              pathname: '/search',
              query: {
                ...queryParams,
                city: queryParams.city === city.name ? undefined : city.name,
              },
            }}
          >
            {city.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            className={`${
              queryParams.cuisine === cuisine.name ? 'font-bold' : 'font-light'
            } text-reg`}
            key={cuisine.id}
            href={{
              pathname: '/search',
              query: {
                ...queryParams,
                cuisine:
                  queryParams.cuisine === cuisine.name
                    ? undefined
                    : cuisine.name,
              },
            }}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, cls }) => {
            return (
              <Link
                key={price}
                className={`${
                  queryParams.price === price ? 'font-bold' : 'font-light'
                } border w-full text-reg  p-2 text-center ${cls}`}
                href={{
                  pathname: '/search',
                  query: {
                    ...queryParams,
                    price: queryParams.price === price ? undefined : price,
                  },
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
