import { NextRequest, NextResponse } from 'next/server';
import {
  getAvailabilities,
  getRestaurant,
} from '@/app/util/availibilityHelper';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const slug = request.nextUrl.pathname.split('/')[3];
  const day = params.get('day');
  const time = params.get('time');
  const partySize = params.get('partySize');

  if (!slug || !day || !time || !partySize) {
    return NextResponse.json({ errors: 'Invalid parameters' }, { status: 400 });
  }

  const restaurant = await getRestaurant(slug);
  const availabilities = await getAvailabilities(
    restaurant,
    day,
    time,
    partySize,
  );

  return NextResponse.json(availabilities);
}
