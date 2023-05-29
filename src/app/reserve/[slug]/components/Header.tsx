export default function Header() {
  return (
    <div>
      <h3 className="font-bold">You&apos;re almost done!</h3>
      <div className="mt-5 flex">
        <img
          src="https://resizer.otstatic.com/v2/photos/legacy/5/28943464.jpg"
          alt=""
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">Steakhouse Bros</h1>
          <div className="flex mt-3">
            <p className="mr-6">22.5.2023</p>
            <p className="mr-6">19:00</p>
            <p className="mr-6">2 persons</p>
          </div>
        </div>
      </div>
    </div>
  );
}
