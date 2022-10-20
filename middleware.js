import { NextResponse } from 'next/server';

export default function middleware(req) {
  let verify = req.cookies.get('token');
  let url = req.url;

  if (!verify && url.includes('/employeeform')) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
  }

  if (verify && url === `${process.env.NEXT_PUBLIC_URL}/login`) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/employeeform`);
  }
}
