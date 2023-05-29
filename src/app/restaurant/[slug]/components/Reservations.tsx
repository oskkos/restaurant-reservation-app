import React from 'react';

export default function Reservations() {
  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center norder-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" id="" className="py-3 border-b font-light">
          <option value="">1 person</option>
          <option value="">2 person</option>
          <option value="">3 person</option>
          <option value="">4 person</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <input type="text" className="py-3 border-b font-lioght w-28" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light">
            <option value="">7:30</option>
            <option value="">9:30</option>
            <option value="">11:30</option>
            <option value="">13:30</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a time
        </button>
      </div>
    </div>
  );
}
