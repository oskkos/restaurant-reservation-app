import NavBar from '@/app/components/NavBar';
import Header from '@/app/search/components/Header';
import SideBar from '@/app/search/components/SideBar';
import RestaurantCard from '@/app/search/components/RestaurantCard';

export default function Search() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar></NavBar>
        <Header></Header>
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SideBar></SideBar>
          <RestaurantCard></RestaurantCard>
        </div>
      </main>
    </main>
  );
}
