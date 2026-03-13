import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth-utils';

// Routes that don't require authentication
const publicRoutes = ['/auth/login', '/api/auth/login'];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 1. Check if path is public
    const isPublicRoute = publicRoutes.includes(path);

    // 2. Get session from cookies
    const cookie = request.cookies.get('session');
    let session = null;

    if (cookie) {
        try {
            session = await decrypt(cookie.value);
        } catch (e) {
            console.error('Session decryption failed:', e);
        }
    }

    // 3. Redirect to login if no session and not a public route
    if (!isPublicRoute && !session) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
    }

    // 4. Role-based protection for SaaS Admin
    if (path.startsWith('/saas-admin') && session?.role !== 'SAAS_SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    return NextResponse.next();
}

// Routes to match for middleware
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
