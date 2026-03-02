import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const blockedPaths = ['/services', '/login', '/profile'];

  if (
    authToken &&
    (pathname === '/login' || pathname === '/signup' || pathname === '/verify-email')
  ) {
    const referer = request.headers.get('referer');
    const redirectUrl = referer || '/';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (!authToken && pathname === '/profile') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (blockedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|assets/).*)',
};
