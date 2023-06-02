import Header from './components/Header';

export const metadata = {
  title: 'Steakhouse Bros',
};

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header></Header>
      <div className="flex m-auto w-2/3 justify-between items-start  -mt-11">
        {children}
      </div>
    </>
  );
}
