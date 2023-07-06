'use client';

import useReservation from '@/app/hooks/useReservation';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const [day, time] = date.split('T');
  const [inputs, setInputs] = useState({
    bookerFirstName: '',
    bookerLastName: '',
    bookerPhone: '',
    bookerEmail: '',
    bookerOccasion: '',
    bookerRequest: '',
  });
  const [disabled, setDisabled] = useState(true);
  const { error, loading, didBook, createReservation } = useReservation();

  useEffect(() => {
    setDisabled(
      !(
        inputs.bookerFirstName &&
        inputs.bookerLastName &&
        inputs.bookerPhone &&
        inputs.bookerEmail
      ),
    );
  }, [inputs]);

  const onButtonClick = async () => {
    const booking = await createReservation({
      data: inputs,
      slug,
      day,
      time,
      partySize,
    });
    setInputs({
      bookerFirstName: '',
      bookerLastName: '',
      bookerPhone: '',
      bookerEmail: '',
      bookerOccasion: '',
      bookerRequest: '',
    });
  };
  return didBook ? (
    <div className="mt-10 w-[660px]">
      <h1>You&apos;re all booked up</h1>
      <p>Enjoy your reservation</p>
    </div>
  ) : (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        value={inputs.bookerFirstName}
        onChange={(e) => {
          setInputs({ ...inputs, bookerFirstName: e.target.value });
        }}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        value={inputs.bookerLastName}
        onChange={(e) => {
          setInputs({ ...inputs, bookerLastName: e.target.value });
        }}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        value={inputs.bookerPhone}
        onChange={(e) => {
          setInputs({ ...inputs, bookerPhone: e.target.value });
        }}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email"
        value={inputs.bookerEmail}
        onChange={(e) => {
          setInputs({ ...inputs, bookerEmail: e.target.value });
        }}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
        value={inputs.bookerOccasion}
        onChange={(e) => {
          setInputs({ ...inputs, bookerOccasion: e.target.value });
        }}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
        value={inputs.bookerRequest}
        onChange={(e) => {
          setInputs({ ...inputs, bookerRequest: e.target.value });
        }}
      />
      <button
        disabled={disabled || loading}
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
        onClick={onButtonClick}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          'Complete reservation'
        )}
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Message & data rates may apply. You can opt out
        of receiving text messages at any time in your account settings or by
        replying STOP
      </p>
    </div>
  );
}
