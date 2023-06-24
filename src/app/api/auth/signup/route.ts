import { prisma } from '@/app/util/prisma';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const data: { [key: string]: string } = await request.json();
  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(data.firstName, { min: 1, max: 20 }),
      errorMessage: 'Invalid first name',
    },
    {
      valid: validator.isLength(data.lastName, { min: 1, max: 40 }),
      errorMessage: 'Invalid last name',
    },
    {
      valid: validator.isEmail(data.email),
      errorMessage: 'Invalid email',
    },
    {
      valid: validator.isMobilePhone(data.phone),
      errorMessage: 'Invalid phone number',
    },
    {
      valid: validator.isLength(data.city, { min: 1, max: 20 }),
      errorMessage: 'Invalid city',
    },
    {
      valid: validator.isStrongPassword(data.password),
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

  const userWithEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (userWithEmail) {
    return NextResponse.json(
      { errors: 'User already exists' },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
