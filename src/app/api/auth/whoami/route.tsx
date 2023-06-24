import { prisma } from '@/app/util/prisma';
import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const bearerToken = request.headers.get('Authorization');
  if (!bearerToken) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }
  const token = bearerToken.split(' ')[1];
  if (!token) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return NextResponse.json({ errors: 'Unauthorized' }, { status: 401 });
  }

  const data = jwt.decode(token) as { email: string };
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: {
      first_name: true,
      last_name: true,
      city: true,
      email: true,
      phone: true,
    },
  });

  return NextResponse.json(user);
}
