import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth-utils';

// Routes that don't require authentication
const publicRoutes = ['/auth/login', '/api/auth/login'];

// Module base routes
const moduleRoutes = ['/pos', '/inventory', '/reports', '/ventas'];

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

    // 5. Module access protection
    const activeModule = moduleRoutes.find(route => path.startsWith(route));
    if (activeModule && session?.companyId && session?.role !== 'SAAS_SUPER_ADMIN') {
        // Here we could check the database, but since middleware is Edge, 
        // we might prefer to proxy the check or use a cached session property.
        // For now, let's assume valid access if session exists, 
        // but real production would check the `CompanyModule` table via a fast API or cached session.
        // A common pattern is to include enabled module codes in the decrypted session/token.
    }

    return NextResponse.next();
}

// Routes to match for middleware
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
