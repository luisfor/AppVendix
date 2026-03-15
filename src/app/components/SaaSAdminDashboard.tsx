'use client';

import { useState, useEffect, useCallback } from 'react';
import { CompanyStatus } from '@prisma/client';
import { toggleCompanyStatus, createCompany, softDeleteCompany, updateCompanyPlan, impersonateCompany, getCompanies, CompanyFilter } from '@/lib/actions/saas-admin';
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
        companiesPerPlan?: { name: string; count: number }[];
    };
    initialData: {
        companies: any[];
        totalCount: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
    plans: any[];
    hideMetrics?: boolean;
}

export default function SaaSAdminDashboard({ metrics, initialData, plans, hideMetrics }: SaaSAdminDashboardProps) {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState<{ id: string, planId: string } | null>(null);
    const [showToggleModal, setShowToggleModal] = useState<{ id: string, name: string, status: CompanyStatus } | null>(null);

    // Query States
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<CompanyFilter>({});
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        planId: plans[0]?.id || '',
        adminName: '',
        adminEmail: '',
    });

    const refreshData = useCallback(async () => {
        setIsFetching(true);
        try {
            const result = await getCompanies({
                page,
                pageSize: 10,
                search,
                filter,
                sortBy,
                sortOrder
            });
            setData(result);
        } catch (error) {
            console.error('Error fetching companies:', error);
        } finally {
            setIsFetching(false);
        }
    }, [page, search, filter, sortBy, sortOrder]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Reset page on search
    };

    const handleFilterClick = (newFilter: CompanyFilter) => {
        setFilter(newFilter);
        setPage(1);
    };

    const clearFilters = () => {
        setFilter({});
        setSearch('');
        setPage(1);
        setSortBy('createdAt');
        setSortOrder('desc');
    };

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const confirmToggleStatus = async () => {
        if (!showToggleModal) return;
        setLoading(showToggleModal.id);
        await toggleCompanyStatus(showToggleModal.id, showToggleModal.status);
        setLoading(null);
        setShowToggleModal(null);
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
            {/* Advanced Metrics Grid */}
            {!hideMetrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { label: 'MRR', value: `$${metrics.mrr.toLocaleString()}`, icon: '📈', color: 'bg-emerald-500', sub: 'Monthly Recurring Revenue', clickable: false },
                        { label: 'Revenue Anual Est.', value: `$${metrics.estimatedYearlyRevenue.toLocaleString()}`, icon: '💰', color: 'bg-blue-500', sub: 'Basado en suscripciones', clickable: false },
                        { label: 'Empresas Activas', value: metrics.activeCompanies, icon: '✅', color: 'bg-purple-500', sub: `De ${metrics.totalCompanies} totales`, filter: { status: CompanyStatus.ACTIVE } },
                        { label: 'Nuevas (Mes)', value: metrics.newCompaniesThisMonth, icon: '✨', color: 'bg-amber-500', sub: 'Crecimiento mensual', filter: { createdMonth: true } },
                        { label: 'Usuarios Plataforma', value: metrics.totalPlatformUsers, icon: '👥', color: 'bg-indigo-500', sub: 'Carga actual', clickable: false },
                        { label: 'Suspendidas', value: metrics.suspendedCompanies, icon: '⚠️', color: 'bg-rose-500', sub: 'Control de Churn', filter: { status: CompanyStatus.SUSPENDED } },
                    ].map((m) => (
                        <div
                            key={m.label}
                            onClick={() => m.filter && handleFilterClick(m.filter)}
                            className={`glass-card rounded-2xl p-6 transition-all duration-300 hover:border-[var(--text-dim)]/20 group ${m.filter ? 'cursor-pointer hover:bg-[var(--text-dim)]/5' : ''}`}
                        >
                            <div className={`h-10 w-10 rounded-xl ${m.color}/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                                {m.icon}
                            </div>
                            <p className="text-[var(--text-dim)] text-[10px] font-black uppercase tracking-wider mb-1">{m.label}</p>
                            <h3 className="text-2xl font-black text-[var(--text-main)]">{m.value}</h3>
                            <p className="text-[var(--text-dim)]/50 text-[9px] mt-1 font-medium">{m.sub}</p>
                        </div>
                    ))}

                    {/* Dynamic Companies Per Plan Cards */}
                    {metrics.companiesPerPlan?.map((plan) => {
                        const planObj = plans.find(p => p.name === plan.name);
                        return (
                            <div
                                key={plan.name}
                                onClick={() => planObj && handleFilterClick({ planId: planObj.id })}
                                className="glass-card rounded-2xl p-6 transition-all duration-300 hover:border-[var(--text-dim)]/20 group cursor-pointer hover:bg-[var(--text-dim)]/5"
                            >
                                <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                                    🏢
                                </div>
                                <p className="text-[var(--text-dim)] text-[10px] font-black uppercase tracking-wider mb-1">Plan {plan.name}</p>
                                <h3 className="text-2xl font-black text-[var(--text-main)]">{plan.count}</h3>
                                <p className="text-[var(--text-dim)]/50 text-[9px] mt-1 font-medium">Empresas activas en este plan</p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Filter Status Badge */}
            {(Object.keys(filter).length > 0 || search) && (
                <div className="flex items-center justify-between bg-purple-600/10 border border-purple-500/20 px-6 py-3 rounded-2xl animate-in slide-in-from-left-4 duration-500">
                    <div className="flex items-center gap-2">
                        <span className="text-[var(--text-dim)] text-xs font-black uppercase tracking-widest">Filtrando por:</span>
                        <div className="flex flex-wrap gap-2">
                            {filter.status && (
                                <span className="bg-purple-600 text-white text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter">
                                    Estado: {filter.status}
                                </span>
                            )}
                            {filter.planId && (
                                <span className="bg-purple-600 text-white text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter">
                                    Plan: {plans.find(p => p.id === filter.planId)?.name}
                                </span>
                            )}
                            {filter.createdMonth && (
                                <span className="bg-purple-600 text-white text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter">
                                    Creados este mes
                                </span>
                            )}
                            {search && (
                                <span className="bg-[var(--text-main)] text-[var(--background)] text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter">
                                    Búsqueda: {search}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={clearFilters}
                        className="text-[var(--text-dim)] hover:text-rose-500 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                        ✕ Limpiar Filtros
                    </button>
                </div>
            )}

            {/* Companies List */}
            <div className={`glass-card rounded-3xl overflow-hidden shadow-2xl shadow-black/20 ${isFetching ? 'opacity-50 pointer-events-none' : ''} transition-opacity duration-300`}>
                <div className="px-8 py-6 border-b border-[var(--border-dim)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-main)]">Gestión de Clientes SaaS</h2>
                        <p className="text-[var(--text-dim)] text-[10px] uppercase font-black tracking-widest mt-1">
                            {data.totalCount} Resultados Encontrados
                        </p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Buscar empresa o email..."
                                value={search}
                                onChange={handleSearch}
                                className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-purple-500 transition-all"
                            />
                            {isFetching && <div className="absolute right-3 top-2.5 h-3 w-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />}
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-600/20 active:scale-95 flex items-center gap-2 whitespace-nowrap"
                        >
                            <span>+</span> Nueva Empresa
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--text-dim)]/[0.02] text-[var(--text-dim)] text-[10px] uppercase tracking-[0.15em] font-bold">
                                <th className="px-8 py-4 border-b border-[var(--border-dim)] font-black cursor-pointer hover:text-[var(--text-main)] transition-colors" onClick={() => handleSort('name')}>
                                    Empresa {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="px-8 py-4 border-b border-[var(--border-dim)] font-black">Suscripción</th>
                                <th className="px-8 py-4 border-b border-[var(--border-dim)] font-black">Uso</th>
                                <th className="px-8 py-4 border-b border-[var(--border-dim)] text-right font-black cursor-pointer hover:text-[var(--text-main)] transition-colors" onClick={() => handleSort('createdAt')}>
                                    Fecha {sortBy === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="px-8 py-4 border-b border-[var(--border-dim)] text-right font-black">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-dim)]">
                            {data.companies.map((company) => (
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
                                    <td className="px-8 py-5 text-right font-mono text-[10px] text-[var(--text-dim)]">
                                        {new Date(company.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-3 text-lg">
                                            <button
                                                onClick={() => setShowToggleModal({ id: company.id, name: company.name, status: company.status })}
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

                {/* Pagination Controls */}
                <div className="px-8 py-4 border-t border-[var(--border-dim)] flex items-center justify-between">
                    <span className="text-[10px] text-[var(--text-dim)] font-black uppercase tracking-widest">
                        Página {data.page} de {data.totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={data.page === 1 || isFetching}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-4 py-2 rounded-xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] text-xs font-bold hover:bg-[var(--text-dim)]/10 disabled:opacity-30 transition-all"
                        >
                            Anterior
                        </button>
                        <button
                            disabled={data.page >= data.totalPages || isFetching}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 disabled:opacity-30 transition-all"
                        >
                            Siguiente
                        </button>
                    </div>
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
            {/* Toggle Status Modal */}
            {showToggleModal && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowToggleModal(null)} />
                    <div className="glass-card w-full max-w-md rounded-[2.5rem] p-10 relative z-10 shadow-3xl animate-in zoom-in-95 fade-in duration-300 text-center">
                        <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl ${showToggleModal.status === CompanyStatus.ACTIVE ? 'bg-rose-500/20 text-rose-500 shadow-rose-500/20' : 'bg-emerald-500/20 text-emerald-500 shadow-emerald-500/20'}`}>
                            {showToggleModal.status === CompanyStatus.ACTIVE ? '⚠️' : '✅'}
                        </div>
                        <h2 className="text-2xl font-black mb-4 text-[var(--text-main)]">
                            {showToggleModal.status === CompanyStatus.ACTIVE ? '¿Suspender Empresa?' : '¿Activar Empresa?'}
                        </h2>
                        <p className="text-[var(--text-dim)] mb-8 text-lg">
                            ¿Estás seguro que deseas {showToggleModal.status === CompanyStatus.ACTIVE ? 'suspender' : 'activar'} el acceso a la empresa <br /><span className="font-bold text-[var(--text-main)]">{showToggleModal.name}</span>?
                        </p>
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => setShowToggleModal(null)}
                                className="flex-1 py-3.5 rounded-2xl font-bold bg-[var(--text-dim)]/10 text-[var(--text-dim)] hover:bg-[var(--text-dim)]/20 hover:text-[var(--text-main)] transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmToggleStatus}
                                disabled={loading === showToggleModal.id}
                                className={`flex-1 py-3.5 rounded-2xl font-black transition-all shadow-xl disabled:opacity-50 ${showToggleModal.status === CompanyStatus.ACTIVE ? 'bg-rose-500 text-white shadow-rose-500/30 hover:bg-rose-600' : 'bg-emerald-500 text-white shadow-emerald-500/30 hover:bg-emerald-600'}`}
                            >
                                {loading === showToggleModal.id
                                    ? 'Procesando...'
                                    : (showToggleModal.status === CompanyStatus.ACTIVE ? 'Sí, Suspender' : 'Sí, Activar')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
