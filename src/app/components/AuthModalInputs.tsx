import { ChangeEvent } from 'react';

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  mode: 'Signin' | 'Signup';
}

export default function AuthModalInputs({
  inputs,
  onInputChange,
  mode,
}: Props) {
  return (
    <div>
      {mode === 'Signin' ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First name"
            value={inputs.firstName}
            name="firstName"
            onChange={onInputChange}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last name"
            value={inputs.lastName}
            name="lastName"
            onChange={onInputChange}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          name="email"
          onChange={onInputChange}
        />
      </div>
      {mode === 'Signin' ? null : (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            value={inputs.phone}
            placeholder="Phone"
            name="phone"
            onChange={onInputChange}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            name="city"
            onChange={onInputChange}
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          name="password"
          onChange={onInputChange}
        />
      </div>
    </div>
  );
}
