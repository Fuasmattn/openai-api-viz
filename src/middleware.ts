
import { NextResponse } from 'next/server';

const THROTTLE = 2000;

export async function middleware() {
  // await new Promise((resolve) => setTimeout(() => resolve(""), THROTTLE));
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}