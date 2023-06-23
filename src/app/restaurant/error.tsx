'use client';

import Image from 'next/image';
import errorImg from '#/icons/error.png';

export default function Error({
  error,
}: {
  error: Error & { digest: number };
}) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorImg} alt="error" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Well, this is embarrassing</h3>
        <p className="text-reg font-bold">{error.message}</p>
        <p className="mt-6 text-sm font-light">Error code: {error.digest}</p>
      </div>
    </div>
  );
}
