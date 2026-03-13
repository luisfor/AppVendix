"use client";

import React, { useState } from 'react';

interface User {
    id: string;
    name: string | null;
    email: string;
    role: { name: string } | null;
}

export default function UserManagement({ initialUsers }: { initialUsers: User[] }) {
    const [users, setUsers] = useState(initialUsers);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
                    <p className="text-[var(--text-dim)] text-sm">Controla quién tiene acceso a este sistema y sus permisos</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-purple-600/20">
                    + Nuevo Usuario
                </button>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-[var(--border-dim)]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[var(--border-dim)] bg-[var(--text-dim)]/[0.02]">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">Nombre</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">Email</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">Rol</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--text-dim)]">Estado</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-var(--text-dim)] text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-dim)]">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-[var(--text-dim)]/[0.02] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-[var(--text-dim)]/10 border border-[var(--border-dim)] flex items-center justify-center text-xs font-bold text-[var(--text-main)]">
                                            {user.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-sm font-medium">{user.name || 'Sin nombre'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[var(--text-main)]/60">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                        {user.role?.name || 'Usuario'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-green-400 uppercase tracking-wider">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Activo
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors text-xs font-bold uppercase tracking-widest">
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
