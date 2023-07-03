import { TIMES } from '../data';
import { prisma } from './prisma';

type TableMap = { [tableId: number]: boolean };
type Table = { table_id: number };

const tableToTableMap = (x: TableMap, t: Table) => ({
  ...x,
  [t.table_id]: true,
});

const bookingToTableMap = (booking: { tables: Array<Table> }) =>
  booking.tables.reduce(tableToTableMap, {});

const dateBuilder = (day: string, time: string) => new Date(`${day}T${time}`);

const getExistingBookings = async (
  restaurant: number,
  day: string,
  time: string,
) => {
  const searchTimes = TIMES.find((x) => x.time === time)?.searchTimes;
  if (!searchTimes) {
    throw new Error('Invalid data');
  }
  return await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: dateBuilder(day, searchTimes[0]),
        lte: dateBuilder(day, searchTimes[searchTimes.length - 1]),
      },
      restaurant_id: restaurant,
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: { select: { table_id: true } },
    },
  });
};
const getBookedTables = (
  bookings: Awaited<ReturnType<typeof getExistingBookings>>,
): { [time: string]: TableMap } => {
  return bookings.reduce((x: { [time: string]: TableMap }, booking) => {
    const time = booking.booking_time.toISOString();
    return {
      ...x,
      [time]: { ...x[time], ...bookingToTableMap(booking) },
    };
  }, {});
};
const getRestaurant = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { id: true, tables: true, open_time: true, close_time: true },
  });
  if (!restaurant) {
    throw new Error('Invalid data');
  }
  return restaurant;
};

export const getAvailabilities = async (
  restaurantSlug: string,
  day: string,
  time: string,
  partySize: string,
) => {
  const searchTimes = TIMES.find((x) => x.time === time)?.searchTimes;
  if (!searchTimes) {
    throw new Error('Invalid data');
  }

  const restaurant = await getRestaurant(restaurantSlug);
  const bookings = await getExistingBookings(restaurant.id, day, time);
  const bookedTables = getBookedTables(bookings);

  return searchTimes
    .map((searchTime) => ({
      date: dateBuilder(day, searchTime),
      time: searchTime,
      tables: restaurant.tables.filter(
        (table) =>
          !bookedTables[dateBuilder(day, searchTime).toISOString()]?.[table.id],
      ),
    }))
    .map((t) => {
      const sumSeats = t.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);
      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHours =
        dateBuilder(day, availability.time) >=
        dateBuilder(day, restaurant.open_time);
      const timeIsBeforeOpeningHours =
        dateBuilder(day, availability.time) <=
        dateBuilder(day, restaurant.close_time);
      return timeIsAfterOpeningHours && timeIsBeforeOpeningHours;
    });
};
