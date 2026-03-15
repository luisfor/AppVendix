'use server';

import prisma from '@/lib/prisma';
import { encrypt, getSession } from '@/lib/auth-utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Email y contraseña son requeridos' };
    }

    const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true },
    });

    if (!user) {
        return { error: 'Credenciales inválidas' };
    }

    // Verify password (in production use bcrypt.compare)
    // For the demo after seeding with hashed passwords:
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    // Fallback for demo if seed was plain text (remove in production)
    const isPlainTextMatch = password === user.password;

    if (!isCorrectPassword && !isPlainTextMatch) {
        return { error: 'Credenciales inválidas' };
    }

    // Create session
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({
        userId: user.id,
        email: user.email,
        role: user.systemRole,
        companyId: user.companyId,
        themePreference: user.themePreference,
        expires
    });

    // Save session in cookie
    (await cookies()).set('session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    // Redirect based on role
    if (user.systemRole === 'SAAS_SUPER_ADMIN') {
        redirect('/saas-admin');
    } else {
        redirect('/');
    }
}

export async function logout() {
    (await cookies()).set('session', '', { expires: new Date(0) });
    redirect('/auth/login');
}

export async function requireSaaSAdmin() {
    const session = await getSession();
    if (!session || session.role !== 'SAAS_SUPER_ADMIN') {
        redirect('/auth/login');
    }
    return session;
}
