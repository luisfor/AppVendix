'use client';

import { useState, useEffect } from 'react';
import { ModuleStatus } from '@prisma/client';
import { createModule, updateModule } from '@/lib/actions/modules';

interface ModuleFormProps {
    module?: any;
    plans: any[];
    onClose: () => void;
    onSuccess: () => void;
}

export default function ModuleForm({ module, plans, onClose, onSuccess }: ModuleFormProps) {
    const [formData, setFormData] = useState({
        code: module?.code || '',
        name: module?.name || '',
        description: module?.description || '',
        status: module?.status || ModuleStatus.IN_DEVELOPMENT,
        planIds: module?.plans?.map((p: any) => p.id) || [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (module?.id) {
                await updateModule(module.id, formData);
            } else {
                await createModule(formData);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error al guardar el módulo.');
        } finally {
            setLoading(false);
        }
    };

    const togglePlan = (planId: string) => {
        setFormData(prev => ({
            ...prev,
            planIds: prev.planIds.includes(planId)
                ? prev.planIds.filter((id: string) => id !== planId)
                : [...prev.planIds, planId]
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-lg rounded-2xl border border-[var(--border-dim)] overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-[var(--border-dim)]/30 flex justify-between items-center bg-[var(--text-dim)]/5">
                    <h2 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
                        {module ? 'Editar Módulo' : 'Crear Nuevo Módulo'}
                    </h2>
                    <button onClick={onClose} className="text-[var(--text-dim)] hover:text-purple-400 transition-colors">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-dim)]">Código</label>
                            <input
                                required
                                disabled={!!module}
                                value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="EJ: INVENTORY_PRO"
                                className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50 text-[var(--text-main)]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-dim)]">Nombre</label>
                            <input
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nombre del módulo"
                                className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-[var(--text-main)]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-dim)]">Descripción</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Descripción breve de las funcionalidades..."
                            rows={3}
                            className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none text-[var(--text-main)]"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-dim)]">Estado</label>
                        <select
                            value={formData.status}
                            onChange={e => setFormData({ ...formData, status: e.target.value as ModuleStatus })}
                            className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none text-[var(--text-main)]"
                        >
                            {Object.values(ModuleStatus).map(status => (
                                <option key={status} value={status} className="bg-[var(--background)]">{status}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--text-dim)]">Asignar a Planes</label>
                        <div className="grid grid-cols-2 gap-2">
                            {plans.map(plan => (
                                <button
                                    type="button"
                                    key={plan.id}
                                    onClick={() => togglePlan(plan.id)}
                                    className={`flex items-center gap-2 p-3 rounded-xl border text-[11px] font-bold transition-all ${formData.planIds.includes(plan.id)
                                            ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                                            : 'bg-[var(--text-dim)]/5 border-[var(--border-dim)] text-[var(--text-dim)]/60 hover:bg-[var(--text-dim)]/10'
                                        }`}
                                >
                                    <span className="text-lg">{formData.planIds.includes(plan.id) ? '✅' : '💎'}</span>
                                    {plan.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-xl border border-[var(--border-dim)] text-xs font-bold text-[var(--text-main)] hover:bg-[var(--text-dim)]/5 transition-colors uppercase tracking-widest"
                        >
                            Cancelar
                        </button>
                        <button
                            disabled={loading}
                            className="flex-1 py-4 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all uppercase tracking-widest shadow-lg shadow-purple-600/20 disabled:opacity-50"
                        >
                            {loading ? 'Guardando...' : 'Guardar Módulo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
