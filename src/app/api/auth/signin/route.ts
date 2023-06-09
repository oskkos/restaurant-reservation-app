import { prisma } from '@/app/util/prisma';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

export async function POST(req: NextRequest) {
  const data: { [key: string]: string } = await req.json();
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(data.email),
      errorMessage: 'Invalid email',
    },
    {
      valid: validator.isLength(data.password, { min: 1 }),
      errorMessage: 'Invalid password',
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });
  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    return NextResponse.json(
      { errors: 'Email or password is faulty' },
      { status: 401 },
    );
  }

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) {
    return NextResponse.json(
      { errors: 'Email or password is faulty' },
      { status: 401 },
    );
  }

  const alg = 'HS256';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime('24h')
    .sign(secret);

  const res = NextResponse.json({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city,
  });
  res.cookies.set('jwt', token, { maxAge: 60 * 60 * 24 });
  return res;
}
