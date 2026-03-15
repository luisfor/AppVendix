'use client';

import { useState } from 'react';
import { PlanStatus, SubscriptionPlan, SystemModule } from '@prisma/client';
import { togglePlanStatus, softDeletePlan, duplicatePlan } from '@/lib/actions/plans';
import Link from 'next/link';

interface PlanWithRelations extends SubscriptionPlan {
    modules: SystemModule[];
    _count: {
        companies: number;
    }
}

interface PlansDataGridProps {
    plans: PlanWithRelations[];
    onEdit?: (plan: PlanWithRelations) => void;
}

export default function PlansDataGrid({ plans, onEdit }: PlansDataGridProps) {
    const [loading, setLoading] = useState<string | null>(null);

    const handleToggleStatus = async (id: string, currentStatus: PlanStatus) => {
        setLoading(id);
        try {
            await togglePlanStatus(id, currentStatus);
            window.location.reload(); // Simple refresh to show new state
        } catch (error) {
            console.error(error);
            alert("Error al cambiar estado");
        }
        setLoading(null);
    };

    const handleDelete = async (plan: PlanWithRelations) => {
        if (plan._count.companies > 0) {
            alert('No puedes eliminar un plan que tiene empresas suscritas. Por favor, suspéndelo o cambia a las empresas de plan primero.');
            return;
        }

        if (confirm(`¿Estás seguro de eliminar el plan "${plan.name}"? Esta acción es irreversible.`)) {
            setLoading(plan.id);
            try {
                await softDeletePlan(plan.id);
                window.location.reload();
            } catch (error) {
                console.error(error);
                alert("Error al eliminar plan");
            }
            setLoading(null);
        }
    };

    const handleDuplicate = async (id: string) => {
        setLoading(`dup-${id}`);
        try {
            await duplicatePlan(id);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('Error al duplicar plan');
        }
        setLoading(null);
    };

    return (
        <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[var(--text-dim)]/[0.02] text-[var(--text-dim)] text-[10px] uppercase tracking-[0.15em] font-bold">
                            <th className="px-8 py-5 border-b border-[var(--border-dim)] font-black">Plan & Estado</th>
                            <th className="px-8 py-5 border-b border-[var(--border-dim)] font-black">Precios (Mes/Año)</th>
                            <th className="px-8 py-5 border-b border-[var(--border-dim)] font-black min-w-[200px]">Límites y Módulos</th>
                            <th className="px-8 py-5 border-b border-[var(--border-dim)] font-black text-center">Inquilinos</th>
                            <th className="px-8 py-5 border-b border-[var(--border-dim)] font-black text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-dim)]">
                        {plans.map((plan) => (
                            <tr key={plan.id} className={`hover:bg-[var(--text-dim)]/[0.02] transition-colors group ${plan.status === PlanStatus.ARCHIVED ? 'opacity-50 grayscale' : ''}`}>
                                <td className="px-8 py-6 align-top">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[var(--text-main)] text-lg">{plan.name}</span>
                                            {plan.status === PlanStatus.ARCHIVED && (
                                                <span className="px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-500 text-[9px] uppercase tracking-widest font-black border border-gray-500/20">Archivado</span>
                                            )}
                                        </div>
                                        <div className="text-[10px] text-[var(--text-dim)] font-mono uppercase tracking-widest flex items-center gap-2">
                                            {plan.code} • v{plan.version}
                                            <div className="flex items-center gap-1.5 ml-2">
                                                <span className={`h-1.5 w-1.5 rounded-full ${plan.status === PlanStatus.ACTIVE ? 'bg-emerald-500' : plan.status === PlanStatus.INACTIVE ? 'bg-amber-500' : 'bg-gray-500'}`} />
                                                {plan.status === PlanStatus.ACTIVE ? 'Activo' : plan.status === PlanStatus.INACTIVE ? 'Inactivo' : 'Archivado'}
                                            </div>
                                        </div>
                                        {plan.description && <p className="text-xs text-[var(--text-dim)]/70 mt-2 line-clamp-2 max-w-[250px]">{plan.description}</p>}
                                    </div>
                                </td>

                                <td className="px-8 py-6 align-top">
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider font-bold block mb-1">Mensual</span>
                                            <span className="font-black text-[var(--text-main)] text-xl">${Number(plan.monthlyPrice).toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider font-bold block mb-1">Anual</span>
                                            <span className="font-bold text-[var(--text-main)]/80">${Number(plan.yearlyPrice).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-8 py-6 align-top">
                                    <div className="space-y-4">
                                        {/* Limits */}
                                        <div className="grid grid-cols-2 gap-2 text-[10px] text-[var(--text-dim)] font-mono">
                                            <div className="flex justify-between bg-[var(--text-dim)]/5 p-1.5 rounded-md border border-[var(--border-dim)]">
                                                <span>USR:</span> <span className="font-bold text-[var(--text-main)]">{plan.maxUsers === -1 ? '∞' : plan.maxUsers}</span>
                                            </div>
                                            <div className="flex justify-between bg-[var(--text-dim)]/5 p-1.5 rounded-md border border-[var(--border-dim)]">
                                                <span>SUC:</span> <span className="font-bold text-[var(--text-main)]">{plan.maxBranches === -1 ? '∞' : plan.maxBranches}</span>
                                            </div>
                                            <div className="flex justify-between bg-[var(--text-dim)]/5 p-1.5 rounded-md border border-[var(--border-dim)]">
                                                <span>PRO:</span> <span className="font-bold text-[var(--text-main)]">{plan.maxProducts === -1 ? '∞' : plan.maxProducts}</span>
                                            </div>
                                        </div>
                                        {/* Features */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {plan.isTrialEligible && <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500 border border-blue-500/20">Trial 14D</span>}
                                            {plan.allowCourtesy && <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-500 border border-purple-500/20">Courtesy</span>}
                                            {plan.modules.map(m => (
                                                <span key={m.id} className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[var(--text-dim)]/10 text-[var(--text-dim)] border border-[var(--border-dim)]" title={m.name}>
                                                    {m.code.replace('POS_', '')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-8 py-6 align-top text-center">
                                    <div className="inline-flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] min-w-[80px]">
                                        <span className="text-2xl font-black text-[var(--text-main)]">{plan._count.companies}</span>
                                        <span className="text-[9px] text-[var(--text-dim)] uppercase tracking-widest font-bold mt-1">Suscritos</span>
                                    </div>
                                </td>

                                <td className="px-8 py-6 align-top text-right">
                                    <div className="flex items-center justify-end gap-2 flex-wrap max-w-[150px] ml-auto">
                                        <button
                                            onClick={() => onEdit ? onEdit(plan) : (window as any).editPlan?.(plan)}
                                            className="p-2.5 rounded-xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] text-[var(--text-main)]/70 hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all shadow-sm active:scale-95"
                                            title="Editar Plan"
                                        >
                                            ✏️
                                        </button>

                                        <button
                                            onClick={() => handleDuplicate(plan.id)}
                                            disabled={loading === `dup-${plan.id}`}
                                            className="p-2.5 rounded-xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] text-[var(--text-main)]/70 hover:text-purple-500 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                                            title="Duplicar"
                                        >
                                            {loading === `dup-${plan.id}` ? '...' : '📋'}
                                        </button>

                                        {plan.status !== PlanStatus.ARCHIVED && (
                                            <button
                                                onClick={() => handleToggleStatus(plan.id, plan.status)}
                                                disabled={loading === plan.id}
                                                className={`p-2.5 rounded-xl border transition-all shadow-sm active:scale-95 disabled:opacity-50 ${plan.status === PlanStatus.ACTIVE
                                                    ? 'bg-[var(--text-dim)]/5 border-[var(--border-dim)] text-[var(--text-main)]/70 hover:text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/30'
                                                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                                                    }`}
                                                title={plan.status === PlanStatus.ACTIVE ? "Suspender (Ocultar nuevos)" : "Activar Plan"}
                                            >
                                                {loading === plan.id ? '...' : plan.status === PlanStatus.ACTIVE ? '⏸️' : '▶️'}
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDelete(plan)}
                                            disabled={loading === plan.id || plan._count.companies > 0}
                                            className="p-2.5 rounded-xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] text-[var(--text-main)]/70 hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                            title={plan._count.companies > 0 ? "No puedes eliminar un plan con clientes activos" : "Eliminar Definitivamente"}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {plans.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center text-[var(--text-dim)]">
                                    No hay planes disponibles. Crea uno para comenzar.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
