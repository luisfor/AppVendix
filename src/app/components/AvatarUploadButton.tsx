'use client';

import React, { useRef, useState } from 'react';
import { Camera, User } from 'lucide-react';
import AvatarCropModal from './AvatarCropModal';
import { useUser } from './UserProvider';

interface AvatarUploadButtonProps {
    size?: 'sm' | 'md' | 'lg';
    showEditOverlay?: boolean;
}

export default function AvatarUploadButton({ size = 'md', showEditOverlay = true }: AvatarUploadButtonProps) {
    const { userImage, setUserImage, userName } = useUser();
    const [cropSrc, setCropSrc] = useState<string | null>(null);
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sizeMap = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-16 w-16',
    };

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showToast('error', 'Por favor selecciona un archivo de imagen válido.');
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setCropSrc(reader.result as string);
        });
        reader.readAsDataURL(file);

        // Reset input so same file can be selected again
        e.target.value = '';
    };

    const handleCropSave = async (blob: Blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'avatar.jpg');

        const res = await fetch('/api/user/avatar', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();

        if (!res.ok || data.error) {
            throw new Error(data.error || 'Error desconocido');
        }

        setUserImage(data.imageUrl);
        setCropSrc(null);
        showToast('success', '¡Foto de perfil actualizada correctamente!');
    };

    const initials = userName?.charAt(0).toUpperCase() || '';

    return (
        <>
            {/* Avatar Button */}
            <button
                onClick={() => fileInputRef.current?.click()}
                className={`relative ${sizeMap[size]} rounded-full overflow-hidden border-2 border-[var(--border-dim)] hover:border-purple-500/70 transition-all group focus:outline-none focus:ring-2 focus:ring-purple-500/40`}
                title="Cambiar foto de perfil"
            >
                {userImage ? (
                    <img
                        src={userImage}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="h-full w-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-sm">
                        {initials || <User size={16} />}
                    </div>
                )}

                {/* Edit overlay */}
                {showEditOverlay && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={size === 'lg' ? 20 : 14} className="text-white" />
                    </div>
                )}
            </button>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Crop Modal */}
            {cropSrc && (
                <AvatarCropModal
                    imageSrc={cropSrc}
                    onClose={() => setCropSrc(null)}
                    onSave={handleCropSave}
                />
            )}

            {/* Toast */}
            {toast && (
                <div className={`
                    fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl text-sm font-bold shadow-2xl
                    flex items-center gap-2 animate-in slide-in-from-bottom-4 duration-300
                    ${toast.type === 'success'
                        ? 'bg-emerald-500/90 text-white border border-emerald-400/30'
                        : 'bg-rose-500/90 text-white border border-rose-400/30'
                    }
                `}>
                    {toast.type === 'success' ? '✓' : '✕'} {toast.message}
                </div>
            )}
        </>
    );
}
