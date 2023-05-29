import Link from 'next/link';
export default function RestaurantMenu() {
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
        <div className="flex m-auto w-2/3 justify-between items-start -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow">
            {/* RESTAURANT NAV */}
            <nav className="flex text-reg border-b pb-2">
              <Link href="/restaurant/smokehouse-bros" className="mr-7">
                Overview
              </Link>
              <Link href="/restaurant/smokehouse-bros/menu" className="mr-7">
                Menu
              </Link>
            </nav>
            {/* RESTAURANT NAV */} {/* MENU */}
            <main className="bg-white mt-5">
              <div>
                <div className="mt-4 pb-1 mb-1">
                  <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex-flex-wrap justify-between">
                  {/* MENU CARD */}
                  <div className="border rounded p-3 w-[49%] mb-3">
                    <h3 className="font-bold text-lg">Brisket meal</h3>
                    <p className="font-light mt-1 text-sm">
                      Brisket with mac and cheese
                    </p>
                    <p className="mt-7">20€</p>
                  </div>
                  {/* MENU CARD */}
                </div>
              </div>
            </main>
            {/* MENU */}
          </div>
        </div>
        {/* DESCRIPTION */}
      </main>
    </main>
  );
}
