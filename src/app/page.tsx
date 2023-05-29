import NavBar from '@/app/components/NavBar';
import Header from '@/app/components/Header';
import RestaurantCard from './components/RestaurantCard';

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar></NavBar>
        <main>
          <Header></Header>
          <div className="py-3 px-36 mt-10 flex flex-wrap">
            <RestaurantCard></RestaurantCard>
          </div>
        </main>
      </main>
    </main>
  );
}
