import RestaurantNavBar from '../components/RestaurantNavBar';
import Menu from '../components/Menu';
import { prisma } from '@/app/util/prisma';

interface Props {
  params: {
    slug: string;
  };
}

const fetchMenuBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUniqueOrThrow({
    where: { slug },
    select: {
      items: true,
    },
  });
  return restaurant.items;
};

export default async function RestaurantMenu(props: Props) {
  const items = await fetchMenuBySlug(props.params.slug);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={props.params.slug}></RestaurantNavBar>
        <Menu items={items}></Menu>
      </div>
    </>
  );
}
