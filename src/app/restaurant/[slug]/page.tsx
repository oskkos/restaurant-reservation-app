import NavBar from '@/app/components/NavBar';
import Header from '@/app/restaurant/[slug]/components/Header';
import RestaurantNavBar from '@/app/restaurant/[slug]/components/RestaurantNavBar';
import Title from './components/Title';
import Rating from './components/Rating';
import Description from './components/Description';
import Images from './components/Images';
import Reviews from './components/Reviews';
import Reservations from './components/Reservations';
export default function RestaurantDetails() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar></NavBar>
        <Header></Header>
        {/* DESCRIPTION */}
        <div className="flex m-auto w-2/3 justify-between items-start  -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            <RestaurantNavBar></RestaurantNavBar>
            <Title></Title>
            <Rating></Rating>
            <Description></Description>
            <Images></Images>
            <Reviews></Reviews>
          </div>
          {/* RESERVATION CARD */}
          <div className="w-[27%] relative text-reg">
            <Reservations></Reservations>
          </div>
        </div>
      </main>
    </main>
  );
}
