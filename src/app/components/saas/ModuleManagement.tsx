'use client';

import { useState } from 'react';
import { ModuleStatus } from '@prisma/client';
import { toggleModuleStatus, getModules, deleteModule } from '@/lib/actions/modules';
import ModuleForm from './ModuleForm';

interface ModuleManagementProps {
    initialData: any;
    plans: any[];
}

export default function ModuleManagement({ initialData, plans }: ModuleManagementProps) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<ModuleStatus | ''>('');
    const [showForm, setShowForm] = useState(false);
    const [selectedModule, setSelectedModule] = useState<any>(null);

    const refreshData = async (page = data.page) => {
        setLoading(true);
        try {
            const newData = await getModules({
                page,
                pageSize: data.pageSize,
                search,
                status: statusFilter || undefined
            });
            setData(newData);
        } catch (error) {
            console.error('Error refreshing modules:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (module: any) => {
        if (!confirm(`¿Estás seguro de que deseas ${module.status === 'ACTIVE' ? 'desactivar' : 'activar'} el módulo ${module.name}?`)) return;

        try {
            await toggleModuleStatus(module.id, module.status);
            refreshData();
        } catch (error) {
            alert('Error al cambiar el estado del módulo');
        }
    };

    const handleDelete = async (module: any) => {
        if (!confirm(`¿Estás seguro de que deseas ELIMINAR permanentemente el módulo ${module.name}? Esta acción no se puede deshacer.`)) return;

        const res = await deleteModule(module.id);
        if (!res.success) {
            alert(res.error);
        } else {
            refreshData();
        }
    };

    const openEdit = (module: any) => {
        setSelectedModule(module);
        setShowForm(true);
    };

    const openCreate = () => {
        setSelectedModule(null);
        setShowForm(true);
    };

    const getStatusColor = (status: ModuleStatus) => {
        switch (status) {
            case ModuleStatus.ACTIVE: return 'bg-green-500/10 text-green-400 border-green-500/20';
            case ModuleStatus.INACTIVE: return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            case ModuleStatus.BETA: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case ModuleStatus.IN_DEVELOPMENT: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-white/5 text-white/40 border-white/10';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Actions */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                <div className="relative w-full lg:w-96 group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-500 transition-colors">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o código..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && refreshData(1)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                    />
                </div>

                <div className="flex gap-4 w-full lg:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none cursor-pointer font-bold text-white/60"
                    >
                        <option value="" className="bg-slate-900">Todos los estados</option>
                        {Object.values(ModuleStatus).map(status => (
                            <option key={status} value={status} className="bg-slate-900">{status}</option>
                        ))}
                    </select>

                    <button
                        onClick={openCreate}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-purple-600/20 active:scale-95 flex items-center gap-2"
                    >
                        <span>➕</span> Crear Módulo
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-[10px] uppercase tracking-widest font-black text-white/40">
                                <th className="px-8 py-6">Módulo</th>
                                <th className="px-8 py-6 text-center">Estado</th>
                                <th className="px-8 py-6">Planes Disponibles</th>
                                <th className="px-8 py-6">Fecha Creación</th>
                                <th className="px-8 py-6 text-right whitespace-nowrap">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.modules.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-white/20 font-bold italic">
                                        {loading ? 'Cargando módulos...' : 'No se encontraron módulos con los filtros aplicados.'}
                                    </td>
                                </tr>
                            ) : (
                                data.modules.map((module: any) => (
                                    <tr key={module.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-xl shadow-inner">
                                                    🧩
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white group-hover:text-purple-300 transition-colors uppercase tracking-tight">{module.name}</p>
                                                    <p className="text-[10px] font-mono text-white/20 group-hover:text-white/40">{module.code}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${getStatusColor(module.status)} shadow-sm`}>
                                                {module.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-wrap gap-1">
                                                {module.plans && module.plans.length > 0 ? (
                                                    module.plans.map((p: any) => (
                                                        <span key={p.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-white/40">
                                                            {p.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-[9px] italic text-white/10">Sin asignar</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-[11px] font-bold text-white/30 whitespace-nowrap">
                                            {new Date(module.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEdit(module)}
                                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-purple-500/20 hover:border-purple-500/20 hover:text-purple-400 transition-all active:scale-90"
                                                    title="Editar"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(module)}
                                                    className={`h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all active:scale-90 ${module.status === 'ACTIVE'
                                                            ? 'hover:bg-rose-500/20 hover:border-rose-500/20 hover:text-rose-400'
                                                            : 'hover:bg-green-500/20 hover:border-green-500/20 hover:text-green-400'
                                                        }`}
                                                    title={module.status === 'ACTIVE' ? 'Desactivar' : 'Activar'}
                                                >
                                                    {module.status === 'ACTIVE' ? '🚫' : '✅'}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(module)}
                                                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-red-600/20 hover:border-red-600/20 hover:text-red-500 transition-all active:scale-90"
                                                    title="Eliminar"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-8 py-6 border-t border-white/5 bg-white/[0.01] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-bold text-white/20 tracking-widest uppercase">
                        Mostrando <span className="text-white/60">{(data.page - 1) * data.pageSize + 1} - {Math.min(data.page * data.pageSize, data.totalCount)}</span> de <span className="text-white/60">{data.totalCount}</span> módulos
                    </p>

                    <div className="flex gap-2">
                        <button
                            disabled={data.page === 1 || loading}
                            onClick={() => refreshData(data.page - 1)}
                            className="px-5 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest disabled:opacity-30 hover:bg-white/5 transition-all active:scale-95"
                        >
                            Anterior
                        </button>
                        {Array.from({ length: data.totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => refreshData(i + 1)}
                                className={`w-10 h-10 rounded-xl border text-[10px] font-black transition-all active:scale-95 ${data.page === i + 1
                                        ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20'
                                        : 'border-white/10 text-white/40 hover:bg-white/5 hover:border-white/20'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            disabled={data.page === data.totalPages || loading}
                            onClick={() => refreshData(data.page + 1)}
                            className="px-5 py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest disabled:opacity-30 hover:bg-white/5 transition-all active:scale-95"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            {showForm && (
                <ModuleForm
                    module={selectedModule}
                    plans={plans}
                    onClose={() => setShowForm(false)}
                    onSuccess={() => refreshData()}
                />
            )}
        </div>
    );
}
