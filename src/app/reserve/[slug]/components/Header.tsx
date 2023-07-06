import { Time, convertToDisplayTime } from '@/app/util/convertToDisplayTime';
import dayjs from 'dayjs';

export default function Header({
  image,
  name,
  date,
  partySize,
}: {
  image: string;
  name: string;
  date: string;
  partySize: string;
}) {
  const [day, time] = date.split('T');
  return (
    <div>
      <h3 className="font-bold">You&apos;re almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{dayjs(day).format('ddd, D, YYYY')}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">{partySize} persons</p>
          </div>
        </div>
      </div>
    </div>
  );
}
