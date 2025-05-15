import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/credentials')) {
    if (!token) {
      console.log('Middleware: No token found, redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    console.log('Middleware: Token found, proceeding');
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/credentials/:path*'],
};