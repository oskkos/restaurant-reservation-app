import Link from 'next/link';

export default function RestaurantCard() {
  return (
    <div className="w-5/6">
      <div className="border-b flex pb-5">
        <img
          src="https://resizer.otstatic.com/v2/photos/legacy/5/28943464.jpg"
          alt=""
          className="w-44 rounded"
        />
        <div className="pl-5">
          <h2 className="text-3xl">Steakhouse Bros</h2>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2 text-sm">Awesome</p>
          </div>
          <div className="mb-9">
            <div className="font-light flex text-reg">
              <p className="mr-4">$$$</p>
              <p className="mr-4">BBQ</p>
              <p className="mr-4">Tampere</p>
            </div>
          </div>
          <div className="text-red-600">
            <Link href="/restaurant/steakhouse-bros">
              View more information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
