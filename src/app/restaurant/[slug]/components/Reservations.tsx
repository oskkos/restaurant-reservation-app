'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  PARTY_SIZE,
  TIMES,
  getTimeSlotsByRestaurantOpenTime,
} from '@/app/data';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, TextFieldProps } from '@mui/material';

export default function Reservations({
  openTime,
  closeTime,
}: {
  openTime: string;
  closeTime: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(new Date()),
  );

  const onDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
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
          <select name="" id="" className="py-3 border-b font-light">
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
            <select name="" id="" className="py-3 border-b font-light">
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
          <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
            Find a time
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
}
