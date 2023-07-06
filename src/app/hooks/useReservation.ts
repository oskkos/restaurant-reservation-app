import axios from 'axios';
import { useState } from 'react';

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [didBook, setDidBook] = useState(false);

  const createReservation = async ({
    slug,
    day,
    time,
    partySize,
    data,
  }: {
    slug: string;
    day: string;
    time: string;
    partySize: string;
    data: {
      bookerFirstName: string;
      bookerLastName: string;
      bookerPhone: string;
      bookerEmail: string;
      bookerOccasion: string;
      bookerRequest: string;
    };
  }) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `/api/restaurant/${slug}/reserve`,
        data,
        {
          params: { day, time, partySize },
        },
      );
      setLoading(false);
      setDidBook(true);
      setError(null);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setDidBook(false);
      setError(error.response.data.errors);
    }
  };
  return { loading, error, didBook, createReservation };
}
