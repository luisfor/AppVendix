'use client';

import React, { useState } from 'react';
import { upsertUser, deleteUser } from '@/lib/actions/users';
import { Plus, Pencil, Trash2, User, Mail } from 'lucide-react';
import UserForm from './UserForm';
import { SystemRole } from '@prisma/client';

interface SaaSAdminManagementProps {
    initialAdmins: any[];
}

export default function SaaSAdminManagement({ initialAdmins }: SaaSAdminManagementProps) {
    const [admins, setAdmins] = useState(initialAdmins);
    const [showForm, setShowForm] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSuccess = async (data: any) => {
        const result = await upsertUser(data);
        if (result.error) {
            throw new Error(result.error);
        }

        // Optimistic update or refresh? Let's refresh simple way
        window.location.reload();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este administrador? Perderá acceso inmediato.')) return;
        setLoading(true);
        try {
            await deleteUser(id);
            setAdmins(admins.filter(a => a.id !== id));
        } catch (error) {
            alert('Error al eliminar');
        } finally {
            setLoading(false);
        }
    };

    const openEdit = (admin: any) => {
        setSelectedAdmin(admin);
        setShowForm(true);
    };

    const openCreate = () => {
        setSelectedAdmin(null);
        setShowForm(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-[var(--text-main)] tracking-tighter">Administradores Maestro</h1>
                    <p className="text-[var(--text-dim)] text-sm font-medium mt-1 uppercase tracking-widest">Personal de Soporte y Dueños de la Plataforma</p>
                </div>
                <button
                    onClick={openCreate}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-purple-600/20 active:scale-95 flex items-center gap-2"
                >
                    <Plus size={18} /> Nuevo Administrador
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {admins.map((admin) => (
                    <div key={admin.id} className="glass-card p-6 rounded-3xl border border-[var(--border-dim)] hover:border-purple-500/30 transition-all group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-[var(--border-dim)] flex items-center justify-center shadow-inner font-bold text-[var(--text-main)] overflow-hidden">
                                {admin.image ? (
                                    <img src={admin.image} alt={admin.name} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-xl opacity-50">{admin.name?.charAt(0) || <User size={24} />}</span>
                                )}
                            </div>
                            <div className="truncate">
                                <h3 className="font-bold text-[var(--text-main)] group-hover:text-purple-300 transition-colors uppercase tracking-tight truncate">{admin.name || 'Sin nombre'}</h3>
                                <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-dim)] truncate">
                                    <Mail size={10} /> {admin.email}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-dim)]">
                            <span className="text-[10px] font-black px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20 tracking-widest">
                                SUPER ADMIN
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEdit(admin)}
                                    className="p-2.5 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 rounded-xl transition-all"
                                    title="Editar"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(admin.id)}
                                    className="p-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-all"
                                    title="Eliminar"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <UserForm
                    user={selectedAdmin}
                    isSuperAdminFlow={true}
                    onClose={() => setShowForm(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
}
