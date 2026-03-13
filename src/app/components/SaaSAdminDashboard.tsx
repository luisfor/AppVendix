'use client';

import { useState } from 'react';
import { CompanyStatus } from '@prisma/client';
import { toggleCompanyStatus, createCompany, softDeleteCompany, updateCompanyPlan, impersonateCompany } from '@/lib/actions/saas-admin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SaaSAdminDashboardProps {
    metrics: {
        totalCompanies: number;
        activeCompanies: number;
        suspendedCompanies: number;
        mrr: number;
        newCompaniesThisMonth: number;
        estimatedYearlyRevenue: number;
        totalPlatformUsers: number;
    };
    companies: any[];
    plans: any[];
    hideMetrics?: boolean;
}

export default function SaaSAdminDashboard({ metrics, companies, plans, hideMetrics }: SaaSAdminDashboardProps) {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState<{ id: string, planId: string } | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        planId: plans[0]?.id || '',
        adminName: '',
        adminEmail: '',
    });

    const handleToggleStatus = async (id: string, status: CompanyStatus) => {
        setLoading(id);
        await toggleCompanyStatus(id, status);
        setLoading(null);
    };

    const handleSoftDelete = async (id: string) => {
        if (confirm('¿Está seguro de eliminar esta empresa? Podrá restaurarla luego.')) {
            setLoading(id);
            await softDeleteCompany(id);
            setLoading(null);
        }
    };

    const handleImpersonate = async (id: string) => {
        setLoading(id);
        const result = await impersonateCompany(id);
        if (result.success) {
            router.push(result.redirectUrl);
        }
        setLoading(null);
    };

    const handleUpdatePlan = async () => {
        if (!showPlanModal) return;
        setLoading(showPlanModal.id);
        await updateCompanyPlan(showPlanModal.id, showPlanModal.planId);
        setLoading(null);
        setShowPlanModal(null);
    };

    const handleCreateCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading('creating');
        await createCompany(formData);
        setLoading(null);
        setShowModal(false);
        setFormData({ name: '', email: '', planId: plans[0]?.id || '', adminName: '', adminEmail: '' });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Advanced Metrics Grid */}
            {!hideMetrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { label: 'MRR', value: `$${metrics.mrr.toLocaleString()}`, icon: '📈', color: 'bg-emerald-500', sub: 'Monthly Recurring Revenue' },
                        { label: 'Revenue Anual Est.', value: `$${metrics.estimatedYearlyRevenue.toLocaleString()}`, icon: '💰', color: 'bg-blue-500', sub: 'Basado en suscripciones' },
                        { label: 'Empresas Activas', value: metrics.activeCompanies, icon: '✅', color: 'bg-purple-500', sub: `De ${metrics.totalCompanies} totales` },
                        { label: 'Nuevas (Mes)', value: metrics.newCompaniesThisMonth, icon: '✨', color: 'bg-amber-500', sub: 'Crecimiento mensual' },
                        { label: 'Usuarios Plataforma', value: metrics.totalPlatformUsers, icon: '👥', color: 'bg-indigo-500', sub: 'Carga actual' },
                        { label: 'Suspendidas', value: metrics.suspendedCompanies, icon: '⚠️', color: 'bg-rose-500', sub: 'Control de Churn' },
                    ].map((m) => (
                        <div key={m.label} className="glass-card rounded-2xl p-6 transition-all duration-300 hover:border-[var(--text-dim)]/20 group">
                            <div className={`h-10 w-10 rounded-xl ${m.color}/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                                {m.icon}
                            </div>
                            <p className="text-[var(--text-dim)] text-[10px] font-black uppercase tracking-wider mb-1">{m.label}</p>
                            <h3 className="text-2xl font-black text-[var(--text-main)]">{m.value}</h3>
                            <p className="text-[var(--text-dim)]/50 text-[9px] mt-1 font-medium">{m.sub}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Companies List */}
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl shadow-black/20">
                <div className="px-8 py-6 border-b border-[var(--border-dim)] flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-main)]">Gestión de Clientes SaaS</h2>
                        <p className="text-[var(--text-dim)] text-sm mt-1">Refactored: Acceso total a operaciones de inquilinos</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-600/20 active:scale-95 flex items-center gap-2"
                    >
                        <span>+</span> Nueva Empresa
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--text-dim)]/[0.02] text-[var(--text-dim)] text-[10px] uppercase tracking-[0.15em] font-bold">
                                <th className="px-8 py-4 border-b border-[var(--border-dim)] font-black">Empresa</th>
                                <th className="px-8 py-4 border-b border-[var(--border-dim)] font-black">Suscripción</th>
                                <th className="px-8 py-4 border-b border-[var(--border-dim)] font-black">Uso</th>
                                <th className="px-8 py-4 border-b border-[var(--border-dim)] text-right font-black">Acciones Operativas</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-dim)]">
                            {companies.map((company) => (
                                <tr key={company.id} className="hover:bg-[var(--text-dim)]/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-[var(--text-dim)]/5 border border-[var(--border-dim)] flex items-center justify-center text-lg font-bold text-[var(--text-main)] group-hover:bg-[var(--text-dim)]/10 transition-colors">
                                                {company.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[var(--text-main)]/90">{company.name}</div>
                                                <div className="text-[10px] text-[var(--text-dim)] font-black uppercase tracking-widest flex items-center gap-2 mt-1">
                                                    {company.email}
                                                    <span className={`h-1 w-1 rounded-full ${company.status === CompanyStatus.ACTIVE ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="space-y-1.5 flex flex-col items-start font-black">
                                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-widest border border-blue-500/20">
                                                {company.plan?.name || 'Manual'}
                                            </span>
                                            <button
                                                onClick={() => setShowPlanModal({ id: company.id, planId: company.planId })}
                                                className="text-[9px] text-[var(--text-dim)]/40 hover:text-[var(--text-main)] transition-colors uppercase tracking-widest"
                                            >
                                                Cambiar Plan
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex gap-6 text-xs font-mono">
                                            <div className="flex flex-col">
                                                <span className="text-[var(--text-dim)] text-[9px] uppercase font-bold tracking-tighter">BNC</span>
                                                <span className="text-[var(--text-main)]/60">{company._count.branches}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[var(--text-dim)] text-[9px] uppercase font-bold tracking-tighter">USR</span>
                                                <span className="text-[var(--text-main)]/60">{company._count.users}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[var(--text-dim)] text-[9px] uppercase font-bold tracking-tighter">SLS</span>
                                                <span className="text-[var(--text-main)]/60">{company._count.sales}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-3 text-lg">
                                            <button
                                                onClick={() => handleToggleStatus(company.id, company.status)}
                                                disabled={loading === company.id}
                                                className={`text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-tighter transition-all border ${company.status === CompanyStatus.ACTIVE
                                                    ? 'text-rose-500/60 border-rose-500/10 hover:bg-rose-500/10'
                                                    : 'text-emerald-500/60 border-emerald-500/10 hover:bg-emerald-500/10'
                                                    }`}
                                            >
                                                {company.status === CompanyStatus.ACTIVE ? 'Suspender' : 'Activar'}
                                            </button>

                                            <button
                                                onClick={() => handleImpersonate(company.id)}
                                                className="p-2 rounded-lg bg-[var(--text-dim)]/[0.05] border border-[var(--border-dim)] text-[var(--text-dim)] hover:text-blue-400 hover:bg-blue-500/10 transition-all active:scale-90"
                                                title="Impersonar"
                                            >
                                                🎭
                                            </button>

                                            <Link
                                                href={`/saas-admin/companies/${company.id}`}
                                                className="p-2 rounded-lg bg-[var(--text-dim)]/[0.05] border border-[var(--border-dim)] text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/10 transition-all active:scale-90 flex items-center justify-center"
                                                title="Ver Detalles"
                                            >
                                                👁️
                                            </Link>

                                            <button
                                                onClick={() => handleSoftDelete(company.id)}
                                                className="p-2 rounded-lg bg-[var(--text-dim)]/[0.05] border border-[var(--border-dim)] text-[var(--text-dim)] hover:text-rose-500 hover:bg-rose-500/10 transition-all active:scale-90"
                                                title="Eliminar"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Plan Update Modal */}
            {showPlanModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPlanModal(null)} />
                    <div className="glass-card w-full max-w-sm rounded-[2rem] p-8 shadow-3xl relative z-10 animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold mb-6 text-[var(--text-main)]">Cambiar Plan</h3>
                        <div className="space-y-3">
                            {plans.map(plan => (
                                <button
                                    key={plan.id}
                                    onClick={() => setShowPlanModal({ ...showPlanModal, planId: plan.id })}
                                    className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between ${showPlanModal.planId === plan.id
                                        ? 'bg-purple-600/10 border-purple-500 text-[var(--text-main)]'
                                        : 'bg-[var(--text-dim)]/5 border-[var(--border-dim)] text-[var(--text-dim)] hover:bg-[var(--text-dim)]/10'
                                        }`}
                                >
                                    <span className="font-bold">{plan.name}</span>
                                    <span className="text-xs font-mono">${plan.price}</span>
                                </button>
                            ))}
                            <div className="flex gap-4 pt-4">
                                <button onClick={() => setShowPlanModal(null)} className="flex-1 py-3 text-[var(--text-dim)] font-bold hover:text-[var(--text-main)] transition-colors">Cancelar</button>
                                <button onClick={handleUpdatePlan} className="flex-1 py-3 bg-[var(--text-main)] text-[var(--background)] rounded-xl font-black shadow-lg shadow-[var(--text-main)]/5 active:scale-95 transition-transform">Actualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* New Company Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="glass-card w-full max-w-2xl rounded-[2.5rem] p-10 relative z-10 shadow-3xl animate-in zoom-in-95 fade-in duration-300">
                        <h2 className="text-3xl font-black mb-8 text-[var(--text-main)]">Registrar Nueva Empresa</h2>

                        <form onSubmit={handleCreateCompany} className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Nombre de la Empresa</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ej. Farmacia Central"
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)]"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Email de Empresa</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="contacto@empresa.com"
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)]"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Plan de Suscripción</label>
                                <select
                                    value={formData.planId}
                                    onChange={e => setFormData({ ...formData, planId: e.target.value })}
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all appearance-none text-[var(--text-main)]"
                                >
                                    {plans.map(p => (
                                        <option key={p.id} value={p.id} className="bg-[var(--background)]">{p.name} (${p.price}/mes)</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-2 mt-4">
                                <div className="h-px bg-[var(--border-dim)] w-full mb-6" />
                                <h3 className="text-sm font-bold text-purple-400 mb-6 uppercase tracking-widest">Cuenta de Administrador Inicial</h3>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Nombre del Admin</label>
                                <input
                                    required
                                    value={formData.adminName}
                                    onChange={e => setFormData({ ...formData, adminName: e.target.value })}
                                    placeholder="Nombre completo"
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)]"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]">Email del Admin</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.adminEmail}
                                    onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                                    placeholder="admin@empresa.com"
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)]"
                                />
                            </div>

                            <div className="col-span-2 flex justify-end gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-8 py-3.5 rounded-2xl font-bold text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    disabled={loading === 'creating'}
                                    type="submit"
                                    className="bg-[var(--text-main)] text-[var(--background)] px-10 py-3.5 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[var(--text-main)]/10 disabled:opacity-50"
                                >
                                    {loading === 'creating' ? 'Creando...' : 'Crear Empresa'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
