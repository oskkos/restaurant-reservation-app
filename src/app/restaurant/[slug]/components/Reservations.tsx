'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PARTY_SIZE, getTimeSlotsByRestaurantOpenTime } from '@/app/data';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Box, CircularProgress, TextFieldProps } from '@mui/material';
import useAvailabilities from '@/app/hooks/useAvailability';
import Link from 'next/link';
import { Time, convertToDisplayTime } from '@/app/util/convertToDisplayTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

export default function Reservations({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState('2');

  const toDay = (date: Dayjs | null) => {
    return date?.format().split('T')[0] ?? '';
  };
  const onDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };
  const onFindTimeClicked = () => {
    fetchAvailabilities({
      slug,
      day: toDay(selectedDate),
      time,
      partySize,
    });
  };
  type BrowserInputProps = TextFieldProps & {
    ownerState?: any;
  };
  const BrowserInput = function BrowserInput(props: BrowserInputProps) {
    const { inputProps, InputProps, ownerState, inputRef, error, ...other } =
      props;

    return (
      <Box
        className="flex flex-wrap flex-start items-center"
        ref={InputProps?.ref}
      >
        <input
          ref={inputRef}
          {...inputProps}
          {...(other as any)}
          className="w-2/3 py-3 border-b font-light"
        />
        <div>{InputProps?.endAdornment}</div>
      </Box>
    );
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center norder-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={partySize}
            onChange={(e) => {
              setPartySize(e.target.value);
            }}
          >
            {PARTY_SIZE.map((x) => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[58%]">
            <label htmlFor="">Date</label>
            {
              <DatePicker
                value={selectedDate}
                onChange={onDateChange}
                slots={{
                  textField: BrowserInput,
                }}
              />
            }
          </div>
          <div className="flex flex-col w-[38%]">
            <label htmlFor="">Time</label>
            <select
              name=""
              id=""
              className="py-3 border-b font-light"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            >
              {getTimeSlotsByRestaurantOpenTime(openTime, closeTime).map(
                (x, i) => (
                  <option key={i} value={x.time}>
                    {x.displayTime}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
            onClick={onFindTimeClicked}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit"></CircularProgress>
            ) : (
              'Find a time'
            )}
          </button>
        </div>
        {data?.length ? (
          <div className="mt-4">
            <p className="text-reg">Select a time</p>
            <div className="flex flex-wrap mt-2">
              {data.map((d) => {
                return d.available ? (
                  <Link
                    key={d.time}
                    href={`/reserve/${slug}?date=${toDay(selectedDate)}T${
                      d.time
                    }&partySize=${partySize}`}
                    className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                  >
                    <p className="text-sm font-bold">
                      {convertToDisplayTime(d.time as Time)}
                    </p>
                  </Link>
                ) : (
                  <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </LocalizationProvider>
  );
}
