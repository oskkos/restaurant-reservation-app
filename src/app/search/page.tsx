import Header from '@/app/search/components/Header';
import SideBar from '@/app/search/components/SideBar';
import RestaurantCard from '@/app/search/components/RestaurantCard';

export const metadata = {
  title: 'Search restaurants',
};

export default function Search() {
  return (
    <>
      <Header></Header>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SideBar></SideBar>
        <RestaurantCard></RestaurantCard>
      </div>
    </>
  );
}
