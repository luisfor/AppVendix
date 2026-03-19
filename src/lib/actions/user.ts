'use server';

import prisma from '@/lib/prisma';
import { getSession, encrypt } from '@/lib/auth-utils';
import { cookies } from 'next/headers';

export async function updateUserTheme(theme: string) {
    const session = await getSession();
    if (!session || !session.userId) {
        return { error: 'No autorizado' };
    }

    try {
        // Update DB
        await prisma.user.update({
            where: { id: session.userId },
            data: { themePreference: theme }
        });

        // Refresh Session Cookie with new theme preference
        const expires = new Date(session.expires);
        const newSession = await encrypt({
            ...session,
            themePreference: theme,
        });

        (await cookies()).set('session', newSession, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return { success: true };
    } catch (error) {
        console.error('Error updating theme:', error);
        return { error: 'Error al actualizar el tema' };
    }
}

export async function updateUserAvatar(imageUrl: string) {
    const session = await getSession();
    if (!session || !session.userId) {
        return { error: 'No autorizado' };
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: session.userId },
            data: { image: imageUrl },
        });

        // Refresh Session Cookie with new image
        const expires = new Date(session.expires);
        const newSession = await encrypt({
            ...session,
            image: imageUrl,
        });

        (await cookies()).set('session', newSession, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        return { success: true, user: updatedUser };
    } catch (error) {
        console.error('Error updating avatar:', error);
        return { error: 'Error al actualizar el avatar' };
    }
}
