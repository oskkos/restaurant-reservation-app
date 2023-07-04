import { NextRequest, NextResponse } from 'next/server';
import {
  getAvailabilities,
  getRestaurant,
  getSearchTimesWithTables,
  isWithinOpeningHours,
} from '@/app/util/availibilityHelper';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const slug = request.nextUrl.pathname.split('/')[3];
  const day = params.get('day');
  const time = params.get('time');
  const partySize = parseInt(params.get('partySize') ?? '0');

  if (!slug || !day || !time || !partySize) {
    return NextResponse.json({ errors: 'Invalid parameters' }, { status: 400 });
  }

  const restaurant = await getRestaurant(slug);
  if (!isWithinOpeningHours(restaurant, day, time)) {
    return NextResponse.json(
      { errors: 'Restaurant not open at given time' },
      { status: 400 },
    );
  }
  const targetDate = new Date(`${day}T${time}`);
  const searchTimeWithTables = (
    await getSearchTimesWithTables(restaurant, day, time)
  ).find((x) => x.date.toISOString() === targetDate.toISOString());

  if (
    !searchTimeWithTables ||
    searchTimeWithTables.tables.reduce((acc, t) => acc + t.seats, 0) < partySize
  ) {
    return NextResponse.json({ errors: 'No availability' }, { status: 400 });
  }

  const tablesCount = searchTimeWithTables.tables.reduce((acc, t) => {
    return { ...acc, [t.seats]: [...(acc[t.seats] ?? []), t.id] };
  }, {} as { [tableCount: number]: number[] });

  const tablesToBook: number[] = [];
  let seatsRemaining = partySize;
  while (seatsRemaining > 0) {
    const available = Object.keys(tablesCount).sort();
    const fitsAll = available.filter(
      (size) => parseInt(size) >= seatsRemaining,
    );

    const biggestAvailableTable = fitsAll.length
      ? parseInt(fitsAll[0])
      : parseInt(available[available.length - 1]);

    if (!biggestAvailableTable) {
      return NextResponse.json(
        { errors: 'No availability for such a large party' },
        { status: 400 },
      );
    }
    tablesToBook.push(tablesCount[biggestAvailableTable][0]);
    tablesCount[biggestAvailableTable].shift();
    if (!tablesCount[biggestAvailableTable].length) {
      delete tablesCount[biggestAvailableTable];
    }
    seatsRemaining = seatsRemaining - biggestAvailableTable;
  }
  return NextResponse.json(tablesToBook);
}
