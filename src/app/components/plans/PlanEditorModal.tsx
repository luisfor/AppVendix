'use client';

import { useState, useEffect } from 'react';
import { SystemModule } from '@prisma/client';

interface PlanEditorModalProps {
    plan?: any; // If null, creates new
    availableModules: SystemModule[];
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
}

export default function PlanEditorModal({ plan, availableModules, onClose, onSave }: PlanEditorModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: plan?.name || '',
        description: plan?.description || '',
        monthlyPrice: plan ? Number(plan.monthlyPrice) : 0,
        yearlyPrice: plan ? Number(plan.yearlyPrice) : 0,
        maxUsers: plan?.maxUsers ?? -1,
        maxBranches: plan?.maxBranches ?? -1,
        maxProducts: plan?.maxProducts ?? -1,
        isTrialEligible: plan?.isTrialEligible ?? true,
        allowCourtesy: plan?.allowCourtesy ?? false,
        moduleIds: plan ? plan.modules.map((m: any) => m.id) : [],
    });

    const isEdit = !!plan;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
        } catch (error) {
            console.error(error);
            alert("Error guardando el plan.");
        } finally {
            setLoading(false);
        }
    };

    const toggleModule = (id: string) => {
        setFormData(prev => ({
            ...prev,
            moduleIds: prev.moduleIds.includes(id)
                ? prev.moduleIds.filter((m: string) => m !== id)
                : [...prev.moduleIds, id]
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-10 relative z-10 shadow-3xl animate-in zoom-in-95 fade-in duration-300 custom-scrollbar">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-[var(--text-main)]">
                            {isEdit ? 'Editar Plan de Suscripción' : 'Nuevo Plan de Suscripción'}
                        </h2>
                        {isEdit && (
                            <p className="text-[var(--text-dim)] mt-2">
                                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded border border-amber-500/20 text-xs font-bold uppercase tracking-wider mr-2">Aviso</span>
                                Si modificas el precio o los límites, se creará una nueva versión automáticamente para no afectar a los clientes actuales.
                            </p>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 bg-[var(--text-dim)]/10 hover:bg-[var(--text-dim)]/20 rounded-full text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors h-10 w-10 flex items-center justify-center text-xl">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Info */}
                    <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl border border-[var(--border-dim)] bg-[var(--text-dim)]/[0.02]">
                        <h3 className="col-span-2 text-sm font-black uppercase tracking-[0.2em] text-[var(--text-main)]/60 mb-2">Información General</h3>

                        <div className="col-span-2 space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Nombre del Plan</label>
                            <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)] font-bold text-lg"
                                placeholder="Ej. Plan Global Pro"
                            />
                        </div>

                        <div className="col-span-2 space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Descripción (Opcional)</label>
                            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)] min-h-[100px]"
                                placeholder="Beneficios principales del plan..."
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl border border-[var(--border-dim)] bg-[var(--text-dim)]/[0.02]">
                        <h3 className="col-span-2 text-sm font-black uppercase tracking-[0.2em] text-[var(--text-main)]/60 mb-2">Estructura de Precios</h3>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Precio Mensual (USD)</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] font-bold">$</span>
                                <input required type="number" step="0.01" min="0" value={formData.monthlyPrice} onChange={e => setFormData({ ...formData, monthlyPrice: parseFloat(e.target.value) })}
                                    className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl pl-10 pr-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)] font-black text-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Precio Anual (USD)</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] font-bold">$</span>
                                <input required type="number" step="0.01" min="0" value={formData.yearlyPrice} onChange={e => setFormData({ ...formData, yearlyPrice: parseFloat(e.target.value) })}
                                    className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl pl-10 pr-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)] font-black text-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Limits */}
                    <div className="grid grid-cols-3 gap-6 p-6 rounded-3xl border border-[var(--border-dim)] bg-[var(--text-dim)]/[0.02]">
                        <div className="col-span-3 flex items-center justify-between mb-2">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text-main)]/60">Límites Cuantitativos</h3>
                            <span className="text-[10px] text-[var(--text-dim)] font-black uppercase tracking-widest">Usa "-1" para ilimitado</span>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Máx Usuarios</label>
                            <input required type="number" min="-1" value={formData.maxUsers} onChange={e => setFormData({ ...formData, maxUsers: parseInt(e.target.value) })}
                                className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)] font-mono"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Máx Sucursales</label>
                            <input required type="number" min="-1" value={formData.maxBranches} onChange={e => setFormData({ ...formData, maxBranches: parseInt(e.target.value) })}
                                className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)] font-mono"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Máx Productos</label>
                            <input required type="number" min="-1" value={formData.maxProducts} onChange={e => setFormData({ ...formData, maxProducts: parseInt(e.target.value) })}
                                className="w-full bg-[var(--background)] border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)] font-mono"
                            />
                        </div>
                    </div>

                    {/* Modules and Flags */}
                    <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl border border-[var(--border-dim)] bg-[var(--text-dim)]/[0.02]">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text-main)]/60 mb-4">Módulos del Sistema</h3>
                            {availableModules.map(mod => (
                                <label key={mod.id} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${formData.moduleIds.includes(mod.id) ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/30' : 'bg-[var(--background)] border-[var(--border-dim)] group-hover:border-purple-500/50 text-transparent'}`}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-[var(--text-main)]">{mod.name}</div>
                                        <div className="text-[9px] text-[var(--text-dim)] font-mono">{mod.code}</div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text-main)]/60 mb-4">Políticas de Venta</h3>
                            <label className="flex items-center gap-3 cursor-pointer group p-4 rounded-2xl border border-[var(--border-dim)] bg-[var(--background)] hover:border-purple-500/30 transition-colors">
                                <div className={`w-12 h-6 rounded-full transition-colors relative ${formData.isTrialEligible ? 'bg-emerald-500' : 'bg-[var(--text-dim)]/20'}`}>
                                    <div className={`absolute top-1 content-[''] h-4 w-4 rounded-full bg-white transition-transform ${formData.isTrialEligible ? 'left-7' : 'left-1'}`} />
                                </div>
                                <input type="checkbox" className="hidden" checked={formData.isTrialEligible} onChange={e => setFormData({ ...formData, isTrialEligible: e.target.checked })} />
                                <div>
                                    <div className="font-bold text-[var(--text-main)] text-sm">Elegible para Trial (14 días)</div>
                                    <div className="text-[10px] text-[var(--text-dim)]">Permite probar gratis</div>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group p-4 rounded-2xl border border-[var(--border-dim)] bg-[var(--background)] hover:border-purple-500/30 transition-colors">
                                <div className={`w-12 h-6 rounded-full transition-colors relative ${formData.allowCourtesy ? 'bg-purple-500' : 'bg-[var(--text-dim)]/20'}`}>
                                    <div className={`absolute top-1 content-[''] h-4 w-4 rounded-full bg-white transition-transform ${formData.allowCourtesy ? 'left-7' : 'left-1'}`} />
                                </div>
                                <input type="checkbox" className="hidden" checked={formData.allowCourtesy} onChange={e => setFormData({ ...formData, allowCourtesy: e.target.checked })} />
                                <div>
                                    <div className="font-bold text-[var(--text-main)] text-sm">Permitir Asignación de Cortesía</div>
                                    <div className="text-[10px] text-[var(--text-dim)]">100% descuento manual</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-[var(--border-dim)]">
                        <button type="button" onClick={onClose} className="px-8 py-4 rounded-2xl font-bold text-[var(--text-dim)] hover:bg-[var(--text-dim)]/10 hover:text-[var(--text-main)] transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="bg-[var(--text-main)] text-[var(--background)] px-10 py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[var(--text-main)]/10 disabled:opacity-50 flex items-center gap-2">
                            {loading && <div className="w-5 h-5 border-2 border-[var(--background)] border-t-transparent rounded-full animate-spin" />}
                            {isEdit ? 'Guardar Cambios y Versionar' : 'Crear Plan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
