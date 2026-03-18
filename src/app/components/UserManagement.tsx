'use client';

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, User, ShieldCheck } from 'lucide-react';
import UserForm from './saas/UserForm';
import { upsertUser, deleteUser } from '@/lib/actions/users';

interface User {
    id: string;
    name: string | null;
    email: string;
    role: { name: string } | null;
    systemRole: string;
    image?: string | null;
}

interface UserManagementProps {
    initialUsers: User[];
    companyId: string;
}

export default function UserManagement({ initialUsers, companyId }: UserManagementProps) {
    const [users, setUsers] = useState(initialUsers);
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSuccess = async (data: any) => {
        const result = await upsertUser(data);
        if (result.error) {
            throw new Error(result.error);
        }

        // Refresh local state or reload
        window.location.reload();
    };

    const handleDelete = async (user: User) => {
        if (!confirm(`¿Estás seguro de eliminar a ${user.name}?`)) return;
        setLoading(true);
        try {
            await deleteUser(user.id);
            setUsers(users.filter(u => u.id !== user.id));
        } catch (error) {
            alert('Error al eliminar usuario');
        } finally {
            setLoading(false);
        }
    };

    const openCreate = () => {
        setSelectedUser(null);
        setShowForm(true);
    };

    const openEdit = (user: User) => {
        setSelectedUser(user);
        setShowForm(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Gestión de Personal</h2>
                    <p className="text-[var(--text-dim)] text-sm italic">Controla el acceso de tus cajeros y administradores</p>
                </div>
                <button
                    onClick={openCreate}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-600/20 active:scale-95 flex items-center gap-2"
                >
                    <Plus size={18} /> Nuevo Colaborador
                </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-[var(--border-dim)] shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[var(--border-dim)] bg-[var(--text-dim)]/[0.02]">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">Colaborador</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">Email</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">Cargo</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">Estado</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-dim)] text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-dim)]">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-dim)] italic">
                                    No hay colaboradores registrados todavía.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-[var(--text-dim)]/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400 shadow-inner overflow-hidden uppercase">
                                                {user.image ? (
                                                    <img src={user.image} alt={user.name || ''} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span>{user.name?.charAt(0) || <User size={16} />}</span>
                                                )}
                                            </div>
                                            <span className="text-sm font-bold text-[var(--text-main)]">{user.name || 'Sin nombre'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[var(--text-main)]/60 font-medium">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[9px] font-black px-3 py-1 rounded-full border tracking-widest uppercase flex items-center gap-1 w-fit ${user.systemRole === 'COMPANY_ADMIN'
                                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                            {user.systemRole === 'COMPANY_ADMIN' ? (
                                                <><ShieldCheck size={10} /> Administrador</>
                                            ) : (
                                                <><User size={10} /> Cajero</>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-2 text-[10px] font-black text-green-400 uppercase tracking-widest">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse" />
                                            En Linea
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openEdit(user)}
                                                className="p-2 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg transition-all"
                                                title="Editar"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user)}
                                                className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-all"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <UserForm
                    user={selectedUser}
                    companyId={companyId}
                    isSuperAdminFlow={false}
                    onClose={() => setShowForm(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
}
