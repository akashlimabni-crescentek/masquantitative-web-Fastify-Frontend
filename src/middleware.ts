
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const PUBLIC_ROUTES = ['/', '/forgotPassword', '/resetPassword']; // the landing page — only route visible logged out
const AUTH_ROUTES = ['/login', '/register']; // redirect AWAY from these if already logged in

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const path = request.nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.includes(path);
  const isAuthRoute = AUTH_ROUTES.includes(path);

  if (!isPublicRoute && !isAuthRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};