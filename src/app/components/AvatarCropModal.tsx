'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, Check, Loader2 } from 'lucide-react';

interface Area {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface AvatarCropModalProps {
    imageSrc: string;
    onClose: () => void;
    onSave: (croppedBlob: Blob) => Promise<void>;
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', reject);
        img.src = imageSrc;
    });

    const canvas = document.createElement('canvas');
    const size = Math.min(pixelCrop.width, pixelCrop.height);
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No canvas context');

    // White background — prevents black on transparent images
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Draw circular clip
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        size,
        size
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Canvas toBlob failed'));
        }, 'image/png');
    });
}

export default function AvatarCropModal({ imageSrc, onClose, onSave }: AvatarCropModalProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleSave = async () => {
        if (!croppedAreaPixels) return;
        setLoading(true);
        setError(null);
        try {
            const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
            await onSave(blob);
        } catch (err) {
            setError('Error al procesar la imagen. Intenta con otra.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md glass-card rounded-3xl border border-[var(--border-dim)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border-dim)]">
                    <div>
                        <h2 className="text-lg font-bold text-[var(--text-main)]">Ajustar Foto de Perfil</h2>
                        <p className="text-xs text-[var(--text-dim)] mt-0.5">Arrastra y usa el zoom para encuadrar tu foto</p>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="p-2 rounded-xl hover:bg-[var(--text-dim)]/10 text-[var(--text-dim)] transition-all"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Cropper area */}
                <div className="relative w-full" style={{ height: '320px' }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        style={{
                            containerStyle: { background: '#0a0a0b' },
                            cropAreaStyle: {
                                border: '3px solid rgba(168,85,247,0.8)',
                                boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
                            },
                        }}
                    />
                </div>

                {/* Zoom Slider */}
                <div className="px-6 pt-5 pb-2">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setZoom(z => Math.max(1, z - 0.1))}
                            className="p-1.5 rounded-lg hover:bg-[var(--text-dim)]/10 text-[var(--text-dim)] transition-all"
                        >
                            <ZoomOut size={16} />
                        </button>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.05}
                            value={zoom}
                            onChange={e => setZoom(Number(e.target.value))}
                            className="w-full h-1.5 appearance-none bg-[var(--border-dim)] rounded-full cursor-pointer accent-purple-500"
                        />
                        <button
                            onClick={() => setZoom(z => Math.min(3, z + 0.1))}
                            className="p-1.5 rounded-lg hover:bg-[var(--text-dim)]/10 text-[var(--text-dim)] transition-all"
                        >
                            <ZoomIn size={16} />
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-[var(--text-dim)] mt-2 font-bold tracking-widest uppercase">Zoom: {zoom.toFixed(1)}×</p>
                </div>

                {/* Error */}
                {error && (
                    <p className="mx-6 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-2">
                        {error}
                    </p>
                )}

                {/* Actions */}
                <div className="flex gap-3 p-6 pt-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 px-4 py-3 rounded-2xl border border-[var(--border-dim)] text-sm font-bold text-[var(--text-dim)] hover:bg-[var(--text-dim)]/10 transition-all disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 px-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-black transition-all shadow-lg shadow-purple-600/30 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Check size={16} />
                                Guardar
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
