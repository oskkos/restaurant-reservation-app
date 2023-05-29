import Link from 'next/link';
export default function RestaurantDetails() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        {/* NAVBAR */}
        <nav className="bg-white p-2 flex justify-between">
          <Link href="/" className="font-bold text-gray-700 text-2xl">
            {' '}
            OpenTable{' '}
          </Link>
          <div>
            <div className="flex">
              <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">
                Sign in
              </button>
              <button className="border p-1 px-4 rounded">Sign up</button>
            </div>
          </div>
        </nav>
        {/* NAVBAR */} {/* HEADER */}
        <div className="h-96 overflow-hidden">
          <div className="bg-center  bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
            <h1 className="text-7xl text-white capitalize text-shadow text-center">
              Steakhouse Bros (Tampere)
            </h1>
          </div>
        </div>
        {/* HEADER */} {/* DESCRIPTION */}
        <div className="flex m-auto w-2/3 justify-between items-start  -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            {/* RESTAURANT NAV */}
            <nav className="flex text-reg border-b pb-2">
              <Link href="/restaurant/smokehouse-bros" className="mr-7">
                Overview
              </Link>
              <Link href="/restaurant/smokehouse-bros/menu" className="mr-7">
                Menu
              </Link>
            </nav>
            {/* RESTAURANT NAV */} {/* TITLE */}
            <div className="mt-4 border-b pb-6">
              <h1 className="font-bold text-6xl">Steakhouse Bros</h1>
            </div>
            {/* TITLE */} {/* RATINGS */}
            <div className="flex items-end">
              <div className="ratings mt-2 flex items-center">
                <p>****</p>
                <p className="text-reg ml-3">4.2</p>
              </div>
              <div>
                <p className="text-reg ml-4">324 reviews</p>
              </div>
            </div>
            {/* RATINGS */} {/* DESC */}
            <div className="mt-4">
              <p className="text-reg font-light">
                Inspired by the warmth and vibrancy of Jamaica’s culture and
                people, Chubby&apos;s Jamaican Kitchen is a take on traditional
                Jamaican cooking balanced with relevant culinary twists.
                Co-founded as a passion project by Gusto 54 founder Janet
                Zuccarini and Angela Lawrence, Gusto 54’s Chief Culture Officer,
                Chubby’s is a celebration of their long friendship, and their
                love and respect for the island’s food and all the amazing
                Jamaican cooks they know. Located in a circa-1890 row house
                re-envisioned by Partisans Architects and interior designer
                Wendy Haworth, Chubby’s boasts two floors of seating, two bars,
                and two outdoor patios. It melds old and new, inside and out to
                create a transporting dining experience complete with delicious
                Caribbean cooking, eclectic design and soulful hospitality.
                Chubby&apos;s is also a Michelin Guide CA - rated restaurant.
              </p>
            </div>
            {/* DESC */} {/* IMG */}
            <div>
              <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                7 photos
              </h1>
              <div className="flex flex-wrap">
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/2/51674607.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/2/51674629.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/2/51674688.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/2/51674691.jpg"
                  alt=""
                />
                <img
                  className="w-56 h-44 mr-1 mb-1"
                  src="https://resizer.otstatic.com/v2/photos/xlarge/1/51692116.jpg"
                  alt=""
                />
              </div>
            </div>
            {/* IMG */} {/* REVIEWS */}
            <div>
              <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                What 123 people are saying
              </h1>
              <div>
                {/* REVIEW CARD */}
                <div className="border-b pb-7 mb-7">
                  <div className="flex">
                    <div className="w1/6 flex flex-col items-center">
                      <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                        <h2 className="text-white-text-2xl">MJ</h2>
                      </div>
                      <p className="text-center">Michael Jordan</p>
                    </div>
                    <div className="ml-10-w-5/6">
                      <div className="flex items center">
                        <div className="flex mr-5">*****</div>
                      </div>
                      <div className="mt-5">
                        <p className="text-lg font-light">
                          Exceptional food and drinks. Great ambiance and
                          service. On the pricey side but well worth it for a
                          special night.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* REVIEW CARD */}
              </div>
            </div>
            {/* REVIEWS */}
          </div>
          {/* RESERVATION CARD */}
          <div className="w-[27%] relative">
            <div className="fixed w-[15%] bg-white rounded p-3 shadow">
              <div className="text-center norder-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">Make a reservation</h4>
              </div>
              <div className="my-3 flex flex-col">
                <label htmlFor="">Party size</label>
                <select name="" id="" className="py-3 border-b font-light">
                  <option value="">1 person</option>
                  <option value="">2 person</option>
                  <option value="">3 person</option>
                  <option value="">4 person</option>
                </select>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col w.[48%]">
                  <label htmlFor="">Date</label>
                  <input
                    type="text"
                    className="py-3 border-b font-lioght w-28"
                  />
                </div>
                <div className="flex flex-col w.[48%]">
                  <label htmlFor="">Time</label>
                  <select name="" id="" className="py-3 border-b font-light">
                    <option value="">7:30</option>
                    <option value="">9:30</option>
                    <option value="">11:30</option>
                    <option value="">13:30</option>
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
                  Find a time
                </button>
              </div>
            </div>
          </div>
          {/* RESERVATION CARD */}
        </div>
        {/* DESCRIPTION */}
      </main>
    </main>
  );
}