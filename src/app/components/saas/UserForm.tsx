'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SystemRole } from '@prisma/client';
import { Plus } from 'lucide-react';
import AvatarCropModal from '@/app/components/AvatarCropModal';
import { useUser } from '@/app/components/UserProvider';

interface UserFormProps {
    user?: any;
    companyId?: string;
    isSuperAdminFlow?: boolean;
    onClose: () => void;
    onSuccess: (data: any) => Promise<void>;
}

export default function UserForm({ user, companyId, isSuperAdminFlow, onClose, onSuccess }: UserFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [cropSrc, setCropSrc] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const { setUserImage } = useUser();

    useEffect(() => {
        setMounted(true);
        // Prevent scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        systemRole: user?.systemRole || (isSuperAdminFlow ? SystemRole.SAAS_SUPER_ADMIN : SystemRole.COMPANY_USER),
        image: user?.image || '',
        documentType: user?.documentType || 'CC',
        documentNumber: user?.documentNumber || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setError('Por favor selecciona un archivo de imagen válido.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setCropSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
        // Reset input so same file can be selected again
        e.target.value = '';
    };

    const handleCropSave = async (blob: Blob) => {
        setUploading(true);
        setError(null);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append('file', blob, 'avatar.jpg');

            const res = await fetch('/api/user/avatar', {
                method: 'POST',
                body: formDataUpload,
            });

            const data = await res.json();
            if (!res.ok || data.error) throw new Error(data.error || 'Error al subir la imagen');

            // Update local form preview
            setFormData(prev => ({ ...prev, image: data.imageUrl }));
            // Update global header/navbar avatar instantly
            setUserImage(data.imageUrl);
            setCropSrc(null);
        } catch (err: any) {
            setError(err.message || 'Error al procesar la imagen');
            throw err; // let AvatarCropModal show its error state too
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onSuccess({
                ...formData,
                id: user?.id,
                companyId: isSuperAdminFlow ? undefined : companyId,
            });
            onClose();
        } catch (err: any) {
            setError(err.message || 'Error al guardar el usuario');
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <>
        {createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-card w-full max-w-2xl rounded-3xl border border-[var(--border-dim)] shadow-2xl p-8 animate-in zoom-in slide-in-from-bottom-4 duration-500 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-[var(--border-dim)] overflow-hidden flex items-center justify-center shadow-inner ring-4 ring-purple-500/5 transition-all group-hover:ring-purple-500/20">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="h-full w-full object-cover animate-in fade-in zoom-in duration-500" />
                                ) : (
                                    <span className="text-3xl font-black text-purple-500/40">{formData.name?.charAt(0) || '?'}</span>
                                )}
                            </div>
                            <button 
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all active:scale-95 border-2 border-[var(--background)] disabled:opacity-60"
                                title="Subir foto"
                            >
                                <Plus size={16} />
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-[var(--text-main)]">{user ? 'Editar Perfil' : 'Nuevo Usuario'}</h2>
                            <p className="text-[10px] text-[var(--text-dim)] uppercase tracking-[0.3em] font-black mt-2 bg-[var(--text-dim)]/10 w-fit px-3 py-1 rounded-full">
                                {isSuperAdminFlow ? 'SaaS OS Admin' : 'Staff de Empresa'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors p-2 h-10 w-10 rounded-full hover:bg-[var(--text-dim)]/10 flex items-center justify-center">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Sección: Información Básica */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <span className="h-1 w-8 bg-purple-600 rounded-full" />
                            <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.2em]">Identidad Digital</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                            <div>
                                <label className="block text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-3 ml-2">Nombre Completo</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-6 py-4 text-[var(--text-main)] placeholder:text-[var(--text-dim)]/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                                    placeholder="Nombre y Apellidos"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-3 ml-2">Email Profesional</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-6 py-4 text-[var(--text-main)] placeholder:text-[var(--text-dim)]/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                                    placeholder="usuario@dominio.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección: Identificación y Contacto */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <span className="h-1 w-8 bg-blue-600 rounded-full" />
                            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Contacto y Registro</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
                            <div>
                                <label className="block text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-3 ml-2">Tipo Doc.</label>
                                <div className="relative">
                                    <select
                                        value={formData.documentType}
                                        onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                                        className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-6 py-4 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium appearance-none"
                                    >
                                        <option value="CC">CC</option>
                                        <option value="DNI">DNI</option>
                                        <option value="Pasaporte">Pasaporte</option>
                                        <option value="NIT">NIT</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-dim)]">▼</div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-3 ml-2">Número Identificación</label>
                                <input
                                    type="text"
                                    value={formData.documentNumber}
                                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                                    className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-6 py-4 text-[var(--text-main)] placeholder:text-[var(--text-dim)]/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                    placeholder="Sin puntos ni comas"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                            <div>
                                <label className="block text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-3 ml-2">Teléfono Movil</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-6 py-4 text-[var(--text-main)] placeholder:text-[var(--text-dim)]/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                    placeholder="+00 000 000 0000"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-3 ml-2">O pegar URL imagen</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-6 py-4 text-[var(--text-main)] placeholder:text-[var(--text-dim)]/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección: Configuración de Cuenta */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <span className="h-1 w-8 bg-amber-600 rounded-full" />
                            <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Credenciales de Acceso</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                            <div>
                                <label className="block text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-3 ml-2">
                                    {user ? 'Renovar Contraseña' : 'Clave Maestra'}
                                </label>
                                <input
                                    required={!user}
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-6 py-4 text-[var(--text-main)] placeholder:text-[var(--text-dim)]/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium"
                                    placeholder={user ? "Solo si desea cambiarla" : "Mínimo 8 caracteres"}
                                />
                            </div>
                            {!isSuperAdminFlow && (
                                <div>
                                    <label className="block text-[10px] font-black text-[var(--text-dim)] uppercase tracking-widest mb-3 ml-2">Nivel de Acceso</label>
                                    <div className="relative">
                                        <select
                                            value={formData.systemRole}
                                            onChange={(e) => setFormData({ ...formData, systemRole: e.target.value as SystemRole })}
                                            className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-6 py-4 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium appearance-none"
                                        >
                                            <option value={SystemRole.COMPANY_ADMIN}>Administrador de Empresa</option>
                                            <option value={SystemRole.COMPANY_USER}>Colaborador / Cajero</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-dim)]">▼</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-[10px] font-black uppercase tracking-widest animate-shake">
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="flex gap-4 pt-4 border-t border-[var(--border-dim)]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-8 py-5 rounded-2xl border border-[var(--border-dim)] text-[var(--text-main)] font-black hover:bg-[var(--text-dim)]/10 transition-all text-[10px] uppercase tracking-[0.2em]"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] px-8 py-5 rounded-2xl bg-purple-600 text-white font-black hover:bg-purple-700 transition-all shadow-xl shadow-purple-600/30 disabled:opacity-50 text-[10px] uppercase tracking-[0.2em]"
                        >
                            {loading ? 'Sincronizando...' : (user ? 'Actualizar Perfil' : 'Dar de Alta Usuario')}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
        )}
        {cropSrc && createPortal(
            <AvatarCropModal
                imageSrc={cropSrc}
                onClose={() => setCropSrc(null)}
                onSave={handleCropSave}
            />,
            document.body
        )}
        </>
    );
}
