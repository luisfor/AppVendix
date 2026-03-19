'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Building2, MapPin, Phone, Mail, Save } from 'lucide-react';

interface CompanyEditFormProps {
    company: any;
    onClose: () => void;
    onSuccess: (data: any) => Promise<void>;
}

export default function CompanyEditForm({ company, onClose, onSuccess }: CompanyEditFormProps) {
    const [formData, setFormData] = useState({
        id: company.id,
        name: company.name || '',
        email: company.email || '',
        address: company.address || '',
        phone: company.phone || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await onSuccess(formData);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Error al actualizar datos');
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="glass-card w-full max-w-2xl rounded-[3rem] border border-[var(--border-dim)] shadow-2xl p-10 relative animate-in zoom-in slide-in-from-bottom-8 duration-500 overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <div className="flex justify-between items-center mb-10 relative">
                    <div>
                        <h2 className="text-3xl font-black text-[var(--text-main)] italic tracking-tight uppercase">Editar Empresa</h2>
                        <p className="text-[var(--text-dim)] text-[10px] font-black tracking-widest uppercase mt-1">Configuración del Perfil Corporativo</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-[var(--text-dim)] hover:text-rose-400 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest ml-4">Nombre Comercial</label>
                            <div className="relative group">
                                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest ml-4">Email de Contacto</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest ml-4">Teléfono Corporativo</label>
                            <div className="relative group">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                                    placeholder="+123456789"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest ml-4">Dirección Física (Google Maps)</label>
                            <div className="relative group">
                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] group-focus-within:text-purple-400 transition-colors" size={18} />
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[var(--text-main)] focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                                    placeholder="Ej: Calle 10 #45, Bogota"
                                />
                            </div>
                            <p className="text-[9px] text-[var(--text-dim)] italic ml-4">Esta dirección se utilizará para generar el mapa interactivo.</p>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-xs font-bold text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl border border-[var(--border-dim)] text-[var(--text-main)] font-black text-xs uppercase tracking-widest hover:bg-[var(--text-dim)]/5 transition-all active:scale-95"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-4 rounded-2xl bg-purple-600 text-white font-black text-xs uppercase tracking-widest hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/30 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <><Save size={18} /> Guardar Cambios</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
