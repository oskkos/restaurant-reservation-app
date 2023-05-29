import Link from 'next/link';

export default function RestaurantCard() {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href="/restaurant/smokehouse-bros/">
        <img
          src="https://resizer.otstatic.com/v2/photos/wide-huge/5/51674877.jpg"
          alt="sample-image"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">Smokehouse bros</h3>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2">84 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className="mr-3 ">BBQ</p>
            <p className="mr-3">$$$</p>
            <p>Tampere</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 4 times today</p>
        </div>
      </Link>
    </div>
  );
}
