'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
    title: string;
    description: string;
    itemName: string;
    onConfirm: () => Promise<void>;
    onClose: () => void;
}

export default function DeleteConfirmationModal({ 
    title, 
    description, 
    itemName, 
    onConfirm, 
    onClose 
}: DeleteConfirmationModalProps) {
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await onConfirm();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="glass-card w-full max-w-md rounded-[2.5rem] border border-rose-500/20 shadow-2xl p-8 animate-in zoom-in slide-in-from-bottom-8 duration-500">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="h-20 w-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shadow-inner">
                        <AlertTriangle size={40} strokeWidth={1.5} className="animate-pulse" />
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-[var(--text-main)] tracking-tight italic">
                            {title}
                        </h2>
                        <p className="text-[var(--text-dim)] text-sm font-medium leading-relaxed">
                            {description} <span className="text-rose-400 font-black block mt-2 px-4 py-1.5 bg-rose-500/5 rounded-full border border-rose-500/10 w-fit mx-auto">"{itemName}"</span>
                        </p>
                    </div>

                    <div className="flex w-full gap-4 pt-4">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-6 py-4 rounded-2xl border border-[var(--border-dim)] text-[var(--text-main)] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--text-dim)]/5 transition-all disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={loading}
                            className="flex-1 px-6 py-4 rounded-2xl bg-rose-600 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/30 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <><Trash2 size={14} /> Eliminar</>
                            )}
                        </button>
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors p-2"
                >
                    <X size={20} />
                </button>
            </div>
        </div>,
        document.body
    );
}
