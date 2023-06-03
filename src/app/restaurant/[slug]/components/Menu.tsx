import { Item } from '@prisma/client';
import MenuCard from './MenuCard';

export default function Menu({ items }: { items: Item[] }) {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {items.length === 0 ? 'Sorry, no menu available' : ''}
          {items.map((item) => (
            <MenuCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
