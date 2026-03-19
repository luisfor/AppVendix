import { NextRequest, NextResponse } from 'next/server';
import { updateUserAvatar } from '@/lib/actions/user';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'El archivo debe ser una imagen' }, { status: 400 });
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json({ error: 'La imagen no puede superar 2MB' }, { status: 400 });
        }

        // Convert to base64
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const imageUrl = `data:${file.type};base64,${base64}`;

        const result = await updateUserAvatar(imageUrl);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 401 });
        }

        return NextResponse.json({ success: true, imageUrl }, { status: 200 });
    } catch (error) {
        console.error('Avatar upload error:', error);
        return NextResponse.json({ error: 'Error interno al subir el avatar' }, { status: 500 });
    }
}
