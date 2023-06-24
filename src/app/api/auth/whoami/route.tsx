import { prisma } from '@/app/util/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1] as string;

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
