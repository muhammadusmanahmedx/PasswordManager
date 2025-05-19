import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/credentials')) {
    if (!token) {
      console.log('🔒 Middleware: No token, redirecting to /login');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    console.log('✅ Middleware: Token found, access granted');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/credentials/:path*'],
};
